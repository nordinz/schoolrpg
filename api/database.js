const config = require('./config');
const { MongoClient, ObjectId } = require('mongodb');

const connectionString = config.CONNECTION_STRING;
const client = new MongoClient(connectionString);

const db = client.db('schoolrpg'); // Den här databasen
const collection = db.collection('characters'); // Den här kollektionen (collection)



async function findAll() {
  await client.connect();

  const projection = { name: 1, race: 1, class: 1, stats: 1 };
  const limit = 10;

  let data = await collection.find().project(projection).limit(limit).toArray();

  client.close();

  return data;
}

async function insert(data) {
  try {
    await client.connect();
    const result = await collection.insertOne(data);

    if (result && result.insertedId) {
      const insertedId = result.insertedId;
      const insertedCharacter = await collection.findOne({
        _id: insertedId,
      });
      console.log('Character inserted:', insertedCharacter);
      client.close();
      return insertedCharacter;
    } else {
      console.error('Failed to insert character: Insertion unsuccessful');
      client.close();
      return null;
    }
  } catch (error) {
    console.error(`Failed to insert character: ${error.message}`);
    client.close();
    throw new Error(`Failed to insert character: ${error.message}`);
  }
}

async function findOne(id) {
  await client.connect();
  const result = await collection.findOne({ _id: new ObjectId(id) });
  client.close();
  return result;
}

async function update(id, data) {
    await client.connect()
    const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnOriginal: false }
    )
    client.close()
    return result
}

async function deleteOne(id) {
    await client.connect()
    const result = await collection.findOneAndDelete({ _id: new ObjectId(id) })
    client.close()
    return result
}

module.exports = {
    ObjectId,
    collection,
    findAll,
    insert,
    findOne,
    update,
    deleteOne
}
