const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb://test_mastercode:kWCftmYLwPLB4Agb@ac-zwrh6ma-shard-00-00.vt5kwxg.mongodb.net:27017,ac-zwrh6ma-shard-00-01.vt5kwxg.mongodb.net:27017,ac-zwrh6ma-shard-00-02.vt5kwxg.mongodb.net:27017/?ssl=true&replicaSet=atlas-jj3cdm-shard-0&authSource=admin&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    // Create / select database
    const db = client.db("truckDb");

    // Create / select collection
    const drivers = db.collection("trucks");

    // Insert sample data (this CREATES the DB + collection if they don't exist yet)
    const result = await drivers.insertOne({
      truckId: "T123456",
      name: "Juan Dela Cruz",
      status: "available",
      fuelLevel: 75
    });

    console.log("Inserted document ID:", result.insertedId);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();