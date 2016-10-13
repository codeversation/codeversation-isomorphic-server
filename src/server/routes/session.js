import { Router } from 'express';
import { log } from 'utilities';
// import bcrypt from 'bcrypt';
import { JWT_SECRET } from 'server/config';
import jwt from 'jsonwebtoken';

const router = Router();

import User from 'server/db/model/User';

router.post('/', (req, res) => {
  let { email, password } = req.body.user;

  User.findOne({ email })
    .then(user => {
      user.authenticate(password)
        .then(() => {
          jwt.sign(
            {
              iat: Math.floor(Date.now() / 1000) - 30,
              ...user.toObject(),
            },
            JWT_SECRET,
            {},
            function(err, token) {
                if (token) {
                  res.json({ token, message: 'Token created successefully.' });
                }
              res.status(501).json({ err, message: 'JWT creation failed.' });
            }
          );
        })
        .catch(err => {
          res.status(501).json({ err, message: 'Authentication failure.' });
        });
    })
    .catch(err => {
      res.status(404).json({ err, message: 'User does not exist.' });
    });
});

export default router;
