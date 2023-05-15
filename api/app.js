const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const characters = require('./routes/character');
app.use('/characters', characters);

app.listen(PORT, () => {
  // LYSSNA på port
  console.log('API - Listening on port*:' + PORT);
});
