import { Router } from 'express';

const router = Router();

import Codeversation from 'server/db/model/Codeversation';

router.get('/:id', function(req, res) {
  Codeversation.find(function(err, doc) {
    res.send(doc);
  })
})

router.post('/', function(req, res) {
  var codeversations;
  if(!req.body) {
    res.status(400);
    res.end("error undefined in posting. ");
  }
  if (req.body.codeversation) {
    codeversations = req.body.codeversation;
  } else {
    codeversation = req.body;
  }

  var codeversation = new Codeversation(codeversations);
  codeversation.save(function(err, data) {
    if(err) {
      console.log("server controller :save contact error : ");
      console.log(err);
      res
          .status(400)
          .json([{message: "error in saving data"}]);
    } else {
      res.status(200);
      res.json({codeversation, message: 'codeversation created successfully! '});
    }
  })
});

export default router;
