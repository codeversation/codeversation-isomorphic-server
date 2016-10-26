import { Router } from 'express';

const router = Router();

import Snippet from 'server/db/model/Snippet';

router.post('/', function(req, res) {
  var snippets;
  if(!req.body) {
    res.status(400);
    res.end("error undefined in the snippet. ");
  }
  if (req.body.snippet) {
    snippets = req.body.snippet;
  } else {
    snippet = req.body;
  }

  var snippet = new Snippet(snippets);
  snippet.save(function(err, data) {
    if(err) {
      console.log("server controller :save contact error : ");
      console.log(err);
      res
          .status(400)
          .json([{message: "error in saving data"}]);
    } else {
      res.status(200);
      res.json({snippet, message: 'snippet created successfully! '});
    }
  })
});

export default router;
