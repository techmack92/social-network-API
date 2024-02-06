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

async function getUserById(req, res) {
    const { userId  } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'No users with that ID⚠️' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
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

async function updateUserById(req, res) {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: req.body
            },
            {
                runValidators: true,
                new: true
            },
        );
        if (!user) {
            return res.status(404).json({ message: 'No users with that ID⚠️' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

async function deleteUserById(req, res) {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'No users with that ID⚠️' });
        }
        await Thought.deleteMany({ username: user.username });
        res.json({ message: 'User deleted🚮', user });
    } catch (err) {
        res.status(500).json(err);
    }
};

async function addFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
        const friend = await User.findByIdAndUpdate(userId, 
            { $addToSet: 
                { 
                    friends: friendId
                } 
            }, 
            { 
                runValidators: true, 
                new: true
            }
        );
        if (!friend) {
            return res.status(404).json({ message: 'No users with that ID⚠️' });
        }
        res.json({ message: 'New friend added🆕', friend });
    } catch (err) {
        res.status(500).json(err);
    }
};

async function deleteFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
        const friend = await User.findByIdAndUpdate(userId, 
            { $pull: 
                { 
                    friends: friendId
                } 
            }, 
            { 
                runValidators: true, 
                new: true
            }
        );
        if (!friend) {
            return res.status(404).json({ message: 'No users with that ID⚠️' });
        }
        res.json({ message: 'Friend has been removed✅', friend });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend
};