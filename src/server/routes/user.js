import { Router } from 'express';
import { log } from 'utilities';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'server/config';

const router = Router();

import User from 'server/db/model/User';

//create user route
router.post('/', (req, res) => {
  try {
  req.body.user.passwordDigest = bcrypt.hashSync(req.body.user.password, SALT_ROUNDS);
  User(req.body.user).save()
    .then(user => {
      res.json({ user, message: 'User created successfully.'});
    })
    .catch(err => {
      res.json({ err, message: 'User creation failed.'});
    });
  } catch (err) {
    log(err);
    res.status(500).json({ err: 'Server Exception', message: 'User creation failed.' });
  }
});

export default router;
