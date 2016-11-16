import { Router } from 'express';

const router = Router();

import Codeversation from 'server/db/model/Codeversation';
import Snippet from 'server/db/model/Snippet';


// GET all posts
router.get('/', function(req, res) {
  Codeversation
    .find()
    .populate('_creator')
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
    .populate('_creator')
    .then((codeversation) => res.json(codeversation))
    .catch((err) => {
      console.error(err);
    })

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
  console.log(codeversations);
  codeversations.dateCreated = new Date();
  var codeversation = new Codeversation(codeversations);
  console.log(codeversation);
  if (codeversations.snippet) {
    const originalSnippet = codeversations.snippet;
    originalSnippet.dateCreated = new Date();
    originalSnippet._codeversation = codeversation._id;
    var snippet = new Snippet(originalSnippet);
    snippet.save((err, data) => {
      if(err) {
        console.log("snippet wasnt saved contact error : ");
        console.log(err);
      } else {
        console.log('Snippet saved successfully');
      } 
    })
  }
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

// delete post
router.delete('/:id', function(req, res) {
  Codeversation
    .remove({
      _id: req.params.id
    })
    .then(() => res.status(200).json({
      message: "Codeversations deleted."
    }))
    .catch((err) => {
      res.status(400).json({message: "Error deleteing Codeversation.", err: err})
    })

});

export default router;
