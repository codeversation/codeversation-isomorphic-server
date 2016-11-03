import { Router } from 'express';
const router = Router();
import Comment from 'server/db/model/Comment';


//GET all comments
router.get('/', function(req, res) {
  Comment
  .find()
  .then(function(comments) {
    res.json(comments);
  });
});

// GET one comment
router.get('/:id', function(req, res) {
  Comment
    .findOne({
      _id: req.params.id
    })
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

export default router;
