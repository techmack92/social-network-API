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
      .post(createThought)
      .put(updateThought);

// /api/thought/:thoughtId     
router.route('/:thoughtId')
      .get(getThoughtById)
      .delete(deleteThought);




// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
      .post(createReaction)
      .delete(deleteReaction);


module.exports = router;