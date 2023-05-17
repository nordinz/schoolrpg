const express = require('express');
const { playGame } = require('../services');
const router = express.Router();

router.get('/toss', async (req, res) => {
  try {
    playGame(req, res);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json('Server error!');
  }
});

module.exports = router;
