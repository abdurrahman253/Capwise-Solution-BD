import "server-only";

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "capwisebd";

let clientPromise;

if (uri) {
  if (!globalThis.__capwiseMongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 8,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 5000,
    });
    globalThis.__capwiseMongoClientPromise = client.connect();
  }
  clientPromise = globalThis.__capwiseMongoClientPromise;
}

export function isMongoConfigured() {
  return Boolean(uri);
}

export async function getDatabase() {
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client.db(dbName);
}

export async function insertOptional(collectionName, document) {
  if (!clientPromise) return { persisted: false, reason: "not-configured" };

  try {
    const database = await getDatabase();
    await database.collection(collectionName).insertOne(document);
    return { persisted: true };
  } catch (error) {
    console.error(`[Capwise] MongoDB insert failed for ${collectionName}`, {
      name: error?.name,
      message: error?.message,
    });
    return { persisted: false, reason: "insert-failed" };
  }
}
