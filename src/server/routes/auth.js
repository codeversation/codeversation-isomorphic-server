import { Router } from 'express';
const router = Router();

import { User } from 'server/db/model';


//create user route
router.post('/', async (req, res) => {
  user = await User(req.body).save();
  res.json(user);
});

export default router;
