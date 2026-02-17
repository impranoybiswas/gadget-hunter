import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

if (!process.env.DATABASE_NAME) {
  throw new Error("Missing DATABASE_NAME");
}

const uri = process.env.MONGODB_URI;

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

type GlobalMongo = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
  _mongoClientUri?: string;
};

const globalWithMongo = global as GlobalMongo;

if (
  !globalWithMongo._mongoClientPromise ||
  globalWithMongo._mongoClientUri !== uri
) {
  const client = new MongoClient(uri, options);
  globalWithMongo._mongoClientPromise = client.connect();
  globalWithMongo._mongoClientUri = uri;
}

const clientPromise = globalWithMongo._mongoClientPromise!;

const databaseName = process.env.DATABASE_NAME;

async function connectDB(dbName: string) {
  try {
    const client = await clientPromise;
    console.log(">>>>> Connected to MongoDB <<<<<");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export async function getCollection(collectionName: string) {
  const db = await connectDB(databaseName);
  if (db) return db.collection(collectionName);
  return null;
}
