const { MongoClient } = require('mongodb');
const path = require("path")
const { readdir } = require('fs/promises');

async function con(client) {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db("test");
    return db;
}

try {
    const client = new MongoClient(process.env.MONGODB_URL);
    module.exports = con(client)
} catch (e) {
    console.log(e)
}
