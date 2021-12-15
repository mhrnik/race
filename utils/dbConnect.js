import mongoose from "mongoose";

const mongodbURI = process.env.MONGODB_URI;

if (!mongodbURI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
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
 * Establishes a connection to the mongo database.
 *
 * @returns Established connection
 *
 * ## Examples
 *
 * await dbConnect();
 *
 */
async function dbConnect() {
  if (cache.connection) {
    return cache.connection;
  }

  if (!cache.promise) {
    const opts = {
      bufferCommands: false,
      useUnifiedTopology: false,
    };

    cache.promise = mongoose.connect(mongodbURI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cache.connection = await cache.promise;
  return cache.connection;
}

export default dbConnect;
