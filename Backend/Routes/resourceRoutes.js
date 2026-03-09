const express = require('express');
const router = express.Router();
const Resource = require('../Models/Resource');

router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/', async (req, res) => {
    try {
      const resource = new Resource(req.body);
      await resource.save();
      res.status(201).json(resource);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  router.put('/:id', async (req, res) => {
    try {
      const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedResource);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
module.exports = router;
