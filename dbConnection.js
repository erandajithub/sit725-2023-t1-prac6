const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mern:mern@cluster0.7ykpj.mongodb.net/";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

client.connect();

module.exports = client;