import { Router } from 'express';
const router = Router();
import Comment from 'server/db/model/Comment';

router.post('/', function(req, res) {
  var comments;
  if(!req.body) {
    res.status(400);
    res.end("error undefined in the comment. ");
  }
  if (req.body.comment) {
    comments = req.body.comment;
  } else {
    comment = req.body;
  }

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
