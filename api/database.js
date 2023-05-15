const config = require('./config');
const { MongoClient } = require('mongodb');

const connectionString = config.CONNECTION_STRING;
const client = new MongoClient(connectionString);

const db = client.db('schoolrpg'); // Den här databasen
const collection = db.collection('characters'); // Den här kollektionen (collection)

const ObjectId = require('mongodb').ObjectId;

async function findAll() {
  await client.connect(); // Anslut

  const projection = { name: 1, race: 1, class: 1, stats: 1 }; // Filtrering

  const limit = 10; // Filtrering

  let data = await collection
    .find()
    .project(projection) // Ge mig bara fältet name
    .limit(limit) // Ge mig bara 3 dokument
    .toArray();

  client.close(); // Stäng anslutning

  return data;
}

/* async function insert(name) {
  await client.connect(); // Anslut

  return result; // Returnera result (innehåller eventuella felmeddelanden)
}

async function update(_id, name) {
  await client.connect(); // Anslut

  client.close(); // Stäng anslutning

  return result; // Returnera result (innehåller eventuella felmeddelanden)
}

async function deleteOne(_id) {
  await client.connect(); // Anslut

  client.close(); // Stäng anslutning

  return result; // Returnera result (innehåller eventuella felmeddelanden)
} */

module.exports = {
  findAll,
  /* insert,
  update,
  deleteOne, */
};
