const router = require('express').Router();

const userRoutes = require('./api/userRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

router.use('/', (req, res) => res.send('Nope!'));

module.exports = router;
