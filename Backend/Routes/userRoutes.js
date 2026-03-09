const express = require('express');
const router = express.Router();
const User = require('../Models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    // Extract only allowed fields to update
    const { name, email, preferences } = req.body;
    const allowedUpdates = { name, email, preferences };

    const updatedUser = await User.findByIdAndUpdate(req.params.id, allowedUpdates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
