import { Router } from 'express';
const router = Router();
import Snippet from 'server/db/model/Snippet';
import async from 'async';
//import ObjectId from 'mongoose.Types.ObjectId';

//GET all snippets
router.get('/', function(req, res) {
  Snippet
  .find({parentId: null}, function(error, docs) {
    if (error) {
      res.send(500);
      res.end('error loading all snippets');
    } else {
      var getTrees = [];
      docs.forEach(function(root) {
        getTrees.push(function(callback) {
          root.getTree({
            sort: {dateCreated: 1},

          }, function(error, tree) {
            callback(error, tree);
          })
        })
      })
      async.parallel(getTrees, function(error, trees) {
        if(error) {
           res.send(500);
            res.end('error getting snippet tree');
        } else {
          return res.json(trees);
        }
      })
    }
  })
});

// GET one snippet
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
  if(req.query.parent_id) {
    Snippet
      .findById(new ObjectId(req.query.parent_id), function(error, parent) {
        if (error) {
          res.end('error finding parent: ' + error);
          return res.send(500);
        } else if (parent) {
          parent.appendChild(newSnippet, function(error, snippet) {
            if (error) {
              res.end('error appending child' + error);
              return res.send(500);

            } else {
              res.status(200);
              res.json({newSnippet, message: 'snippet created successfully! '});
            }
          });
        } else {
          res.end('parent_id invalid.');
          return res.send(500);
        }
      });
  } else {
    snippet.save(function(error, newSnippet) {
      if(error) {
        res.end('error posting snippet' + error);
        return res.send(500);
      } else {
        res.status(200);
        res.json({newSnippet, message: 'snippet created successfully! '});
      }
    });
  }
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
