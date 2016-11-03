import { Router } from 'express';

const router = Router();

import Codeversation from 'server/db/model/Codeversation';


// GET all posts
router.get('/', function(req, res) {
  Codeversation
  .find()
  .then(function(codeversations) {
    res.json(codeversations);
  });
});

// GET one post
router.get('/:id', function(req, res) {
  Codeversation
    .findOne({
      _id: req.params.id
    })
    .then(function(codeversation) {
      res.json(codeversation);
    });
});

//display all posts along with CommentSchema
router.get('/',function(req, res){
	Codeversation.find({})
	.populate('comments')
	.exec(function(err, codeversations){
		res.render('index',{codeversations:codeversations});
	})
})

router.post('/', function(req, res) {
  var codeversations;
  if(!req.body) {
    res.status(400);
    res.end("Invalid request.");
  }
  if (req.body.codeversation) {
    codeversations = req.body.codeversation;
  } else {
    codeversations = req.body;
  }
  if (!codeversations.snippets) {
    codeversations.snippets = []
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
