import mongoose from "mongoose";

import User from "./user.js";
import Message from "./message.js";

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Message };

export { connectDb };

export default models;

// let users = {
//   1: {
//     id: "1",
//     username: "Robin Wieruch",
//   },
//   2: {
//     id: "2",
//     username: "Dave Davids",
//   },
// };

// let messages = {
//   1: {
//     id: "1",
//     text: "Hello World",
//     userId: "1",
//   },
//   2: {
//     id: "2",
//     text: "By World",
//     userId: "2",
//   },
// };

// export default {
//   users,
//   messages,
// };
