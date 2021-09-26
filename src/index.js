import "dotenv/config"; // This thing supports the implimentation of .env files.
import cors from "cors";
import express from "express";

import routes from "./routes/index.js";
import models, { connectDb } from "./models/index.js";

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors()); // this prevents an exception error sometimes coused in express so anyways.

// Built-In Middleware

// Accessing the payload of an HTTP POST request is provided within Express
// with its built-in middleware which is based on body-parser (deprecated).
// It enables us to transform body types from our request object (e.g. json, urlencoded):
app.use(express.json()); // json {"Name": "John Smith", "Age": 23}
app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded Name=John+Smith&Age=23
// This extracts the entire body portion of an incoming request stream
// and makes it accessible on req.body.
// REST is not opinionated about the payload format (JSON, XML),
// but once you have chosen a format (here JSON),
// you should stick to it for your entire API.

// Custom Middleware
// middleware made to store the id value of the psudo user
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("rwieruch"),
  };
  next();
});

// * Routes * //

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

// * Start * //

const eraseDatabaseOnSync = false; // to reset the database on each server connection reset

connectDb().then(async () => {
  // function to reset the database on sync
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({}),
    ]);
    console.log("mongoose database cleared");
    createUsersWithMessages();
    console.log("sample data generated");
  }

  app.listen(process.env.PORT, () =>
    console.log(`strange.ness in ${process.env.PORT}!`)
  );
});

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: "thatguy",
  });

  const user2 = new models.User({
    username: "mstrange",
  });

  const message1 = new models.Message({
    text: "would you rather be in hell?",
    user: user1.id,
  });

  const message2 = new models.Message({
    text: "playing with men all the time... I mean the stack. the mongo express node things",
    user: user2.id,
  });

  const message3 = new models.Message({
    text: "release the dragon",
    user: user2.id,
  });

  await message1.save();
  await message2.save();
  await message3.save();

  await user1.save();
  await user2.save();
};

//# notes below, don't mind them

//> a middleware - JS func
// which has access to three arguments: req, res, next.
// You already know req and res objects.
// In addition, the next function should be called
// to signalize that the middleware has finished its job.

// app.use((req, res, next) => {
//   // do something
//   next();
// });

// const date = Date.parse(req.body.date);
// const count = Number(req.body.count);
