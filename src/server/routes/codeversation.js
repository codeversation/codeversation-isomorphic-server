import { Router } from 'express';

const router = Router();

import Codeversation from 'server/db/model/Codeversation';

router.get('/:id', function(req, res) {
  Codeversation.find(function(err, doc) {
    res.send(doc);
  })
})

router.post('/', function(req, res) {
  var codeversations = req.body.codeversation;
  var codeversation = new Codeversation(codeversations);
  codeversation.save(function(err, data) {
    res.json({codeversation, message: 'codeversation created successfully. '});
  })
});

export default router;
