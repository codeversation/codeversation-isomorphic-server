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

// GET comments from codeversation id
router.get('/:id', function(req, res) {
  Comment
  .find({
    _codeversation: req.params.id
  })
  .populate('_creator')
  .populate('_codeversation')
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

/*
var populateNestedComments = function (cb) {
  Comment
  .findOne({
    content: 'comment 10'
  })
  .populate('childs')
  .exec(function(err, comment) {

    // Childs are populated
    console.log('Populated comment:\n');
    console.log(comment);

    // But childs's childs are not
    console.log('\n\nComment child\'s childs are not populated:\n');
    console.log(comment.childs[8]);
    console.log('\n\n');

    // To achieve this, you can then call the static population method:

    var currentComment = comment;
    async.whilst(
      function test () {
        // Stop when arriving to the last comment
        console.log('Comment [%s] - Number of childs: ', currentComment.content, currentComment.childs.length);
        console.log('We need to go deeper...');
        return !!currentComment.childs.length;
      },
      function (callback) {
        Com.populate(currentComment, [{path:'childs.childs', model:'Com' }], function (err, comment) {

          // We jump our comment cursor to its last child, this should end up bringing us to the first comment
          currentComment = comment.childs[ comment.childs.length - 1 ];
          callback();
        });
      },
      function (err) {
        // We needed to stop somewhere anyway...
        // To understand better what happenned, lets dive into our first comment object
        // to find the last child of child of child of child....

        console.log('\nReady to dive ?');

        var synchronousRecursiveDiving = function (comment, chain) {
          chain.push(comment.content);
          if (!!comment.childs.length) {
            return synchronousRecursiveDiving(comment.childs[comment.childs.length - 1], chain);
          }
          return chain;
        };

        var chain = synchronousRecursiveDiving(comment, []).join(' > ');
        console.log(chain);

        // Or we could simply do:
        console.log('\nOr the ugly way:');
        console.log(comment
          .childs[8].childs[7].childs[6].childs[5]
          .childs[4].childs[3].childs[2].childs[1].childs[0].content);

          cb();
        }
      )
    });
  };
  */
  export default router;
