import { Router } from 'express';

let router = Router();

// import ruby to js comiler.
import ruby from './ruby';

router.post('/:lang', (req, res) => {
  if(req.params.lang === 'ruby') {
    res.json({ js: ruby(req.body.code) });
  } else {
    res.status(404).json({ message: 'Language not found.'});
  }
});

export default router;
