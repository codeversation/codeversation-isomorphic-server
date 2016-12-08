import { Router } from 'express';
const router = Router();
import Comment from 'server/db/model/Comment';


//GET all comments
router.get('/', function(req, res) {
  Comment
  .find()
  .populate('_creator')
  .then(function(comments) {
    res.json(comments);
  });
});

// GET comments from snippet id
router.get('/:id', function(req, res) {
  Comment
  .find({
    _snippet: req.params.id
  })
  .populate('_creator')
  .populate('_snippet')
  .then(function(comment) {
    res.json(comment);
  });
});

router.post('/', function(req, res) {
  var comments;
  if(!req.body) {
    res.status(400);
    res.end("error undefined in the comment. ");
  }
  if (req.body.comment) {
    comments = req.body.comment;
  } else {
    comments = req.body;
  }

  comments.dateCreated = new Date();
  var comment = new Comment(comments);
  comment.save(function(err, data) {
    if(err) {
      console.log("server controller :save contact error");
      console.log(err);
      res
      .status(400)
      .json([{ message: "error in saving data" }]);
    } else {
      res.status(200);
      res.json({comment, message: 'comment created successfully! '});
    }
  })
});

// delete comment
router.delete('/:id', function(req, res) {
  Comment
  .remove({
    _id: req.params.id
  })
  .then(() => res.status(200).json({
    message: "Comment deleted."
  }))
  .catch((err) => {
    res.status(400).json({message: "Error deleteing Comment.", err: err})
  })

});

export default router;
