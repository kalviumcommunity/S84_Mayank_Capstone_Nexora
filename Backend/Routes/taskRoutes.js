const express = require('express');
const router = express.Router();
const Task = require('../Models/Task');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('user');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      user: req.body.user 
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user');
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;