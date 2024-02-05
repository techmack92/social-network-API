const Thought = require('../models/Thought');
const User = require('../models/User');

async function getUsers(req, res) {
    try {
        const users = await User.find({}).populate('friends').populate('thoughts');
        return res.json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
};

async function createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// async function getUserById(req, res) {
//     const 
// }