const express = require('express');
const router = express.Router();

const db = require('../database');

router.get('/all', async (req, res) => {
  let data = await db.findAll();

  return res.json(data);
});

module.exports = router;
