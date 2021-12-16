import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = { connection: null, promise: null };
}

/**
 * Establishes a client for a given mongo database.
 *
 * @returns Mongoose client
 *
 * ## Examples
 *
 * await databaseClient();
 *
 */
export default async function establishDatabaseConnection() {
  if (cache.connection) {
    return cache.connection;
  }

  if (!cache.promise) {
    const opts = {
      bufferCommands: false,
      useUnifiedTopology: false,
    };

    cache.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cache.connection = await cache.promise;
  return cache.connection;
}
