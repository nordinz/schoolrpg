const config = require('./config')
const { MongoClient, ObjectId } = require('mongodb')

const connectionString = config.CONNECTION_STRING
const client = new MongoClient(connectionString)

const db = client.db('schoolrpg')
const collection = db.collection('characters')

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

async function insert(data) {
    await client.connect()
    const result = await collection.insertOne(data)
    client.close()
    return result
}

async function findOne(id) {
    await client.connect()
    const result = await collection.findOne({ _id: new ObjectId(id) })
    client.close()
    return result
}

async function update(id, data) {
    await client.connect()
    const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: 'after' }
    )
    client.close()
    return result.value
}

async function deleteOne(id) {
    await client.connect()
    const result = await collection.findOneAndDelete({ _id: new ObjectId(id) })
    client.close()
    return result.value
}

module.exports = {
    ObjectId,
    findAll,
    insert,
    findOne,
    update,
    deleteOne
}
