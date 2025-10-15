const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');
const User = require('../models/User');

router.use(authMiddleware);
router.get('/', permit('admin'), async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'role'] });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/me', async (req, res) => {
  const { id, username, role } = req.user;
  res.json({ id, username, role });
});

module.exports = router;

