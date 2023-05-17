function rollDice(diceQuantity) {
  const diceArray = [];
  for (let i = 0; i < diceQuantity; i++) {
    const dice = Math.floor(Math.random() * 6) + 1;
    diceArray.push(dice);
  }
  console.log(diceArray);
  const totalValue = diceArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  // console.log(totalValue);
  return totalValue;
}

function playGame(req, res) {
  const diceQuantity = req.query.quantity;
  if (isNaN(diceQuantity) || diceQuantity <= 0) {
    return res.status(400).json('Please enter a valid number above 0');
  }

  let characterDice = rollDice(diceQuantity);
  let monsterDice = rollDice(diceQuantity);
  let result;
  if (monsterDice > characterDice) {
    result = 'Monster wins!';
  } else if (monsterDice < characterDice) {
    result = 'Character wins!';
  } else {
    result = 'Its a tie, you live to fight another day!';
  }
  return res.json({ result, monsterDice, characterDice, diceQuantity });
}
module.exports = {
  playGame,
};
