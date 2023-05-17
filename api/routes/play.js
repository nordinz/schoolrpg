const express = require('express');
const { playGame } = require('../services');
const router = express.Router();

router.get('/toss', playGame);

module.exports = router;
