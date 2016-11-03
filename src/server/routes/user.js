import { Router } from 'express';
import { log } from 'utilities';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'server/config';

const router = Router();

import User from 'server/db/model/User';

const hash = password => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, passwordDigest) => {
      if(err){
        reject(err);
      }else{
        resolve(passwordDigest);
      }
    });
  });
};

//create user route
router.post('/', (req, res) => {
  if(!req.body || !req.body.user || !req.body.user.password){
    res.status(400).json({ message: 'Invalid request.'});
    return;
  }

  hash(req.body.user.password)
    .then(passwordDigest => {
      req.body.user.dateCreated = new Date();
      (new User({ ...req.body.user, passwordDigest })).save()
        .then(user => {
          res.json({ user, message: 'User created successfully.' });
        })
        .catch(err => {
          res.status(500).json( { err, message: 'User Creation Failed.'});
        });
    })
    .catch(err => {
      res.status(400).json({ message: 'Unhashable password.'});
    });
});

// delete user route
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

    User.findOne({ email })
      .then(user => {
        if(user) {
          user.authenticate(password)
            .then(() => {
              user.remove()
                .then(() => {
                  res.json({ message: 'User deleted.', user });
                })
                .catch(err => {
                  res.status(500).json({ message: 'User deletion failed.' });
                });
            })
            .catch(err => {
              res.status(500).json({ message: 'Authentication failed.' });
            });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch(err => {
        res.status(404).json({ message: 'User not found' });
      });
    } catch (err) {
      res.status(500).json({ message: 'Server side exception.  User could not be deleted.'});
    }
});

// update user route
router.put('/', (req, res) => {
  try {
    if(!req.user){
      res.status(501).json({ message: 'Authentication Required'});
      return;
    }

    if(!req.body){
      res.status(400).json({ message: 'Request must have JSON body.' });
      return;
    }

    if(!req.body.user){
      res.status(400).json({ message: 'Request must have a user field.' });
      return;
    }

    const newUser = req.body.user;

    User.findOne({ _id: req.user.id })
      .then(user => {
        if(user) {
          (async user => {
            if(newUser.password)
              user.passwordDigest = await hash(newUser.password);
            if(newUser.name) user.name = newUser.name;
            if(newUser.email) user.email = newUser.email;

            return user;
          })(user)
            .then(user => {
              user.save()
                .then(user => {
                  res.json({ user, message: 'User updated.' });
                })
                .catch(err => {
                  res.status(500).json({ message: 'User update failed.' });
                });
            })
            .catch(err => {
              res.status(500).json({ message: 'Password could not be hashed.' });
            });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Query for user failed.' });
      });
    } catch (err) {
      res.status(500).json({ message: 'Server side exception.  User could not be deleted.'});
    }
});

export default router;
