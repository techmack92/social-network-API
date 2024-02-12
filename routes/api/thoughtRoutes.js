const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
      .get(getThoughts)
      .post(createThought);

// /api/thought/:thoughtId     
router.route('/:thoughtId')
      .get(getThoughtById)
      .put(updateThought)
      .delete(deleteThought);

// /api/thought/:thoughtId/reactions   
router.route('/:thoughtId/reactions')
      .post(createReaction);


// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
      .delete(deleteReaction);


module.exports = router;