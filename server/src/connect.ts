import { MongoClient, ServerApiVersion, Db } from "mongodb";
const uri = process.env.MONGODB_URI || "mongodb+srv://gamerzAdmin:WBHY3JQx5Mk819s1@gamerz.breyi.mongodb.net/?retryWrites=true&w=majority&appName=gamerz";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: Db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db("gamerz");
    console.log("Successfully connected to MongoDB!");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export function getDB() {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}
