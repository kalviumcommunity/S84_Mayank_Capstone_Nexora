const express = require('express');
const router = express.Router();
const Task = require('../Models/Task');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
