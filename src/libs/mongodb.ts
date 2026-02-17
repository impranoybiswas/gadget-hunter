import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
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

export default clientPromise;
