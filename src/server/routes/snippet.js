import { Router } from 'express';
const router = Router();
import Snippet from 'server/db/model/Snippet';

//GET all snippets
router.get('/', function(req, res) {
  Snippet
  .find()
  .populate('_creator')
  .populate('_codeversation')
  .then(function(snippets) {
    res.json(snippets);
  });
});

// GET one snippet
router.get('/:id', function(req, res) {
  Snippet
    .findOne({
      _id: req.params.id
    })
    .populate('_creator')
    .populate('_codeversation')
    .then(function(snippet) {
      res.json(snippet);
    });
});

router.post('/', function(req, res) {
  var snippets;
  if(!req.body) {
    res.status(400);
    res.end("error undefined in the snippet. ");
  }
  if (req.body.snippet) {
    snippets = req.body.snippet;
  } else {
    snippets = req.body;
  }
  snippets.dateCreated = new Date();
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

// delete snippet
router.delete('/:id', function(req, res) {
  Snippet
    .remove({
      _id: req.params.id
    })
    .then(() => res.status(200).json({
      message: "Snippet deleted."
    }))
    .catch((err) => {
      res.status(400).json({message: "Error deleteing Snippet.", err: err})
    })

});

export default router;
