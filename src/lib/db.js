// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// console.log("MONGODB_URI exists:", !!MONGODB_URI);

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectDB() {
//   if (cached.conn) {
//     console.log("Using cached DB connection");
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     console.log("Connecting to MongoDB...");

//     cached.promise = mongoose
//       .connect(MONGODB_URI)
//       .then((mongoose) => {
//         console.log("MongoDB connected successfully ✅");
//         return mongoose;
//       })
//       .catch((err) => {
//         console.error("MongoDB connection failed ❌", err);
//         throw err;
//       });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }




// // import mongoose from "mongoose";

// // const MONGODB_URI = process.env.MONGODB_URI;

// // if (!MONGODB_URI) {
// //   throw new Error("Please define MONGODB_URI in .env");
// // }

// // let cached = global.mongoose;

// // if (!cached) {
// //   cached = global.mongoose = { conn: null, promise: null };
// // }

// // export async function connectDB() {
// //   if (cached.conn) return cached.conn;

// //   if (!cached.promise) {
// //     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
// //       return mongoose;
// //     });
// //   }

// //   cached.conn = await cached.promise;
// //   return cached.conn;
// // }


// import mongoose from "mongoose";

// let isConnected = false;

// export async function connectDB() {
//   if (isConnected) return;

//   await mongoose.connect(process.env.MONGODB_URI);
//   isConnected = true;

//   console.log("MongoDB connected ✅");
// }


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
