import { Router } from 'express';
const router = Router();
import Snippet from 'server/db/model/Snippet';

//GET all comments
router.get('/', function(req, res) {
  Snippet
  .find()
  .then(function(snippets) {
    res.json(snippets);
  });
});

// GET one comment
router.get('/:id', function(req, res) {
  Snippet
    .findOne({
      _id: req.params.id
    })
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

export default router;
