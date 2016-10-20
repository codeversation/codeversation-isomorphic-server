import jwt from 'jsonwebtoken';
import User from 'server/db/model/User';
import { JWT_SECRET } from 'server/config';
import { log } from 'utilities';

export default (req, res, next) => {
  const token = req.headers.authorization;
  if (token){
      jwt.verify(token, JWT_SECRET, (err, decodedPayload) => {
        if (err) {
          // invalid token
          res.status(401).json({ message: 'Authentication failed.' });
          return;
        }

        // find the user
        User
          .findOne({ _id: decodedPayload.id })
          .then(user => {
            log(user);
            if (user) {
              // add the user to the request
              req.user = user;
              next();
            }
            else {
              // user not found
              res.status(401).json({ message: 'Authentication failed.' });
            }
          });
      });
  } else {
    next();
  }
};

function isPreflight(req) {
  return (req.method.toLowerCase() === 'options');
}

function isLoggingInOrSigningUp(req) {
  if (req.method.toLowerCase() !== 'post') { return false; }
  const loggingIn = req.originalUrl.includes('session');
  const signingUp = req.originalUrl.includes('user');
  return (loggingIn || signingUp);
}
