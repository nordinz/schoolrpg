const config = require('./config')
const { MongoClient, ObjectId } = require('mongodb')

const connectionString = config.CONNECTION_STRING
const client = new MongoClient(connectionString)

const db = client.db('schoolrpg'); // Den här databasen
const collection = db.collection('characters'); // Den här kollektionen (collection)

const ObjectId = require('mongodb').ObjectId;

async function findAll() {
    await client.connect()

    const projection = { name: 1, race: 1, class: 1, stats: 1 }
    const limit = 10

    let data = await collection
        .find()
        .project(projection)
        .limit(limit)
        .toArray()

    client.close()

    return data
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

    return result;
}
module.exports = {
  findAll,
  /* insert,
  update,
  deleteOne, */
};
