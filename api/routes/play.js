const express = require('express');
const router = express.Router();

router.get('/toss', async (req, res) => {
  let characterDice = Math.floor(Math.random() * 6) + 1;
  let monsterDice = Math.floor(Math.random() * 6) + 1;
  let result;
  if (monsterDice > characterDice) {
    result = 'Monster wins!';
  } else if (monsterDice < characterDice) {
    result = 'Character wins!';
  } else {
    result = 'Its a tie, you live to fight another day!';
  }
  return res.json({ result, monsterDice, characterDice });
});

module.exports = router;
