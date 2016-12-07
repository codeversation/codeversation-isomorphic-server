import { Router } from 'express';

const router = Router();

import Codeversation from 'server/db/model/Codeversation';
import Snippet from 'server/db/model/Snippet';
import { log } from 'utilities';

// GET all posts
router.get('/', function(req, res) {
  Codeversation
    .find()
    .populate('_creator')
    .populate('snippet')
    .deepPopulate('comment.comments')
    .exec(function(error, codeversations) {
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
    .populate('snippet')
    .deepPopulate('comment.comments')
    .then((codeversation) => res.json(codeversation))
    .catch((err) => {
      console.error(err);
    })

});

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

	const snippet = codeversations.snippet;
	delete codeversations.snippet;
  var codeversation = new Codeversation(codeversations);

  if (snippet) {
    (new Snippet({
			...snippet,
			dateCreated: new Date(),
			_codeversation: codeversation._id})
		).save((err, data) => {
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
	log('sldjfs',req.user);
  if(!req.user){
    res.status(400).json({ message: 'Invalid request.'});
    return;
  }

	log('part 2');

	Codeversation.findOne({ _id: req.params.id })
		.then( verse => {
			log(verse, 'part 3');
			if(verse._creator.toString() !== req.user.id) {
		    res.status(400).json({ message: 'Invalid request.'});
		    return;
			}

		  Codeversation
		    .remove({
		      _id: req.params.id
		    })
		    .then(() => res.status(200).json({
		      message: "Codeversations deleted."
		    }))
		    .catch((err) => {
		      res.status(400).json({message: "Error deleteing Codeversation.", err: err})
		    });
		}
	)


});

export default router;
