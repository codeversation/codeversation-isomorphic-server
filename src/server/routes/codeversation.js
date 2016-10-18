import { Router } from 'express';

const router = Router();

import Codeversation from 'server/db/model/Codeversation';

router.get('/codeversations', function(req, res) {
  Codeversation.find(function(err, doc) {
    res.send(doc);
  })
//  return Codeversation.getCodeversation(req, res);
//});
})

router.post(function(req, res) {
  console.log("adding codeversation", codeversations);
  var codeversations = req.body;
  var codeversation = new Codeversation(codeversations);
  codeversation.save(function(err, data) {
    res.status(300).send();
  })
});
  //return Codeversation.create(req, res);
//});


export default router;
