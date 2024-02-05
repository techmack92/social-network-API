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

async function createThought(req, res) {
    const { username, userId, thoughtText } = req.body;
    try {
        const thought = await Thought.create({ thoughtText, username });
        try {
            const user = await User.findByIdAndUpdate(userId, { $push: { thoughts: thought.id } } { new: true });
            if (!user) {
                await Thought.findByIdAndDelete(thought.id);
                return res.status(404).json({ message: 'No user with this ID🚫' });
            }
        } catch (err) {
            await Thought.findByIdAndDelete(thought.id);
            return res.status(500).json(err);
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};