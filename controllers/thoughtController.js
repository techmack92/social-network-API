const Thought = require('../models/Thought');
const User = require('../models/User');

async function getThoughts(req, res) {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

async function getThoughtById(req, res) {
    const { thoughtId } = req. params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thoughts with that ID⚠️' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

async function createThought(req, res) {
    const { username, userId, thoughtText } = req.body;
    try {
        const thought = await Thought.create({ thoughtText, username });
        try {
            const user = await User.findByIdAndUpdate(userId, 
                { $push: 
                    { 
                        thoughts: thought.id 
                    } 
                },
                { 
                    new: true 
                }
            );
            if (!user) {
                await Thought.findByIdAndDelete(thought.id);
                return res.status(404).json({ message: 'No user with this ID⚠️' });
            }
            res.json(thought);
        } catch (updateError) {
            await Thought.findByIdAndDelete(thought.id);
            return res.status(500).json({ message: 'Error updating user', error: updateError.message });
        }
    } catch (creationError) {
        res.status(500).json({ message: 'Error creating thought', error: creationError.message });
    }
};

async function updateThought(req, res) {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { 
                $set: req.body 
            },
            { 
                runValidators: true, 
                new: true
            },
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thoughts with that ID⚠️' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

async function deleteThought(req, res) {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findByIdAndDelete(thoughtId)
        if (!thought) {
            return res.status(404).json({ message: 'No thoughts with that ID⚠️' });
        }
        res.json({ message: 'Thought deleted🚮', thought });
    } catch (err) {
        res.status(500).json(err);
    }
};

async function createReaction(req, res) {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findByIdAndUpdate(thoughtId, 
            { $push: 
                { 
                    reactions: req.body 
                } 
            }, 
            { 
                runValidators: true, 
                new: true
            }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thoughts with that ID⚠️' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

async function deleteReaction(req, res) {
    const { thoughtId, reactionId } = req.params;
    try {
        const deletedThought = await Thought.findOneAndUpdate(
            {
                _id: thoughtId
            },
            { $pull: 
                {
                    reactions: {
                        reactionId: reactionId
                    }
                }
            },
            {
                runValidators: true,
                new: true
            },
        );
        if (!deletedThought) {
            return res.status(404).json({ message: 'No thoughts with that ID⚠️' });
        }
        res.json({ message: 'Reaction deleted🚮', deletedThought });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
};