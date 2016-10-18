import { Router } from 'express';
import { log } from 'utilities';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'server/config';

const router = Router();

import User from 'server/db/model/User';

//create user route
router.post('/', (req, res) => {
  if(!req.body || !req.body.user || !req.body.user.password){
    res.status(400).json({ message: 'Invalid request.'});
    return;
  }

  bcrypt.hash(req.body.user.password, SALT_ROUNDS, (err, passwordDigest) => {
    if(err) {
      log(err);
      res.status(400).json({ message: 'Unhashable password.'});
    } else {
      (new User({ ...req.body.user, passwordDigest })).save()
        .then(user => {
          res.json({ user, message: 'User created successfully.' });
        })
        .catch(err => {
          res.status(500).json( { err, message: 'User Creation Failed.'});
        });
    }
  });
});

router.delete('/', (req, res) => {
  try {
    if(
      !req.body ||
      !req.body.user ||
      !req.body.user.password ||
      !req.body.user.email
    ){
      res.status(400).json({ message: 'Invalid request.'});
      return;
    }

    let { password, email } = req.body.user;

    User.find().then(users => log(users));
    User.findOne({ email })
      .then(user => {
        if(user) {
          log(user);
          user.authenticate(password)
            .then(() => {
              user.remove()
                .then(() => {
                  log(user, 'deleted');
                  res.json({ message: 'User deleted.', user });
                })
                .catch(err => {
                  log(err);
                  res.status(500).json({ message: 'User deletion failed.' });
                });
            })
            .catch(err => {
              log(err);
              res.status(500).json({ message: 'Authentication failed.' });
            });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch(err => {
        log(err);
        res.status(404).json({ message: 'User not found' });
      });
    } catch (err) {
      log(err);
      res.status(500).json({ message: 'Server side exception.  User could not be deleted.'});
    }
});

export default router;
