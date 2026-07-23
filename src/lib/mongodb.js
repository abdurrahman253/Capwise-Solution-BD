import "server-only";

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI?.trim();
const dbName = process.env.MONGODB_DB_NAME?.trim() || "capwisebd";

function getClientPromise() {
  if (!uri) return null;

  if (!globalThis.__capwiseMongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 8,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 7000,
      retryReads: true,
      retryWrites: true,
    });
    globalThis.__capwiseMongoClientPromise = client.connect();
  }

  return globalThis.__capwiseMongoClientPromise;
}

function createIndexes(database) {
  if (!globalThis.__capwiseMongoIndexPromise) {
    globalThis.__capwiseMongoIndexPromise = Promise.allSettled([
      database.collection("consultations").createIndexes([
        { key: { reference: 1 }, name: "reference_unique", unique: true },
        { key: { createdAt: -1 }, name: "created_at_desc" },
        { key: { status: 1, createdAt: -1 }, name: "status_created_at" },
        { key: { emailNormalized: 1, createdAt: -1 }, name: "email_created_at" },
      ]),
      database.collection("guide_downloads").createIndexes([
        { key: { reference: 1 }, name: "reference_unique", unique: true },
        { key: { emailNormalized: 1, resourceSlug: 1 }, name: "email_resource" },
        { key: { updatedAt: -1 }, name: "updated_at_desc" },
      ]),
      database.collection("newsletter_subscribers").createIndexes([
        {
          key: { emailNormalized: 1 },
          name: "email_unique",
          unique: true,
          partialFilterExpression: { emailNormalized: { $type: "string" } },
        },
        { key: { status: 1, updatedAt: -1 }, name: "status_updated_at" },
      ]),
      database.collection("resend_events").createIndexes([
        { key: { eventId: 1 }, name: "event_id_unique", unique: true },
        { key: { emailProviderId: 1, createdAt: -1 }, name: "provider_id_created_at" },
        { key: { type: 1, createdAt: -1 }, name: "type_created_at" },
      ]),
    ]).then((results) => {
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error("[Capwise] MongoDB index setup warning", {
            group: ["consultations", "guide_downloads", "newsletter_subscribers", "resend_events"][index],
            name: result.reason?.name,
            message: result.reason?.message,
          });
        }
      });
    });
  }

  return globalThis.__capwiseMongoIndexPromise;
}

export function isMongoConfigured() {
  return Boolean(uri);
}

export function getMongoDatabaseName() {
  return dbName;
}

export async function getDatabase() {
  const clientPromise = getClientPromise();
  if (!clientPromise) return null;

  const client = await clientPromise;
  const database = client.db(dbName);
  await createIndexes(database);
  return database;
}

export async function pingDatabase() {
  if (!isMongoConfigured()) {
    return { configured: false, reachable: false, reason: "not-configured" };
  }

  try {
    const database = await getDatabase();
    await database.command({ ping: 1 });
    return { configured: true, reachable: true, database: dbName };
  } catch (error) {
    return {
      configured: true,
      reachable: false,
      database: dbName,
      reason: error?.name || "connection-failed",
    };
  }
}

export async function insertOptional(collectionName, document) {
  if (!isMongoConfigured()) return { persisted: false, reason: "not-configured" };

  try {
    const database = await getDatabase();
    const result = await database.collection(collectionName).insertOne(document);
    return { persisted: true, insertedId: result.insertedId };
  } catch (error) {
    console.error(`[Capwise] MongoDB insert failed for ${collectionName}`, {
      name: error?.name,
      message: error?.message,
    });
    return { persisted: false, reason: "insert-failed" };
  }
}

export async function updateOptional(collectionName, filter, update) {
  if (!isMongoConfigured()) return { persisted: false, reason: "not-configured" };

  try {
    const database = await getDatabase();
    const result = await database.collection(collectionName).updateOne(filter, update);
    return {
      persisted: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    };
  } catch (error) {
    console.error(`[Capwise] MongoDB update failed for ${collectionName}`, {
      name: error?.name,
      message: error?.message,
    });
    return { persisted: false, reason: "update-failed" };
  }
}

export async function upsertOptional(collectionName, filter, update) {
  if (!isMongoConfigured()) return { persisted: false, reason: "not-configured" };

  try {
    const database = await getDatabase();
    const result = await database.collection(collectionName).updateOne(filter, update, { upsert: true });
    return {
      persisted: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      upsertedId: result.upsertedId || null,
    };
  } catch (error) {
    console.error(`[Capwise] MongoDB upsert failed for ${collectionName}`, {
      name: error?.name,
      message: error?.message,
    });
    return { persisted: false, reason: "upsert-failed" };
  }
}
