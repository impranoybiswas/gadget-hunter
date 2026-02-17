import clientPromise from "./mongodb";

const databaseName = process.env.DATABASE_NAME || "";

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
