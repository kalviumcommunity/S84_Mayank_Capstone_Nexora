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
module.exports = router;
