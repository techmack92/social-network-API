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
      .put(updateThought)
      .delete(deleteThought);

// /api/thought/:thoughtId     
router.route('/:thoughtId')
.get(getThoughtById);



// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
      .post(createReaction)
      .delete(deleteReaction);


module.exports = router;