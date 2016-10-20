import { Router } from 'express';
import { log } from 'utilities';
import Test from 'server/db/model/Test';

let router = Router();

router.post('/', (req, res) => {
  log(req.body);

  (new Test(req.body)).save()
    .then(test => {
      log(test);
      res.json({ test, message: 'successfully saved.' });

      Test.find({})
        .then(tests => {
          log(tests);
        })
        .catch(err => {
          log(err);
        });
    })
    .catch(err => {
      log(err);
      res.json({ err, message: 'failed to save.' });
    });
});

export default router;
