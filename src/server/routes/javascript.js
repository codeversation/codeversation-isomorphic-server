import { Router } from 'express';
import { SERVER_ROOT } from 'server/config';

const router = Router();

router.get('/app.js', (req, res) => {
  res.sendFile('app.js');
});

export default router;
