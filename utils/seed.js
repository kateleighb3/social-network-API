// Imports
const { Users, Thoughts } = require("../models");
const mongoose = require("mongoose");

const connection = require("../config/connection");

// Seed data
const users = [
  {
    username: "BSpears",
    email: "bspears@gmail.com",
    thoughts: ["Oops, I did it again"],
  },
];

console.log(connection);

// Connects to server
connection.once("open", async () => {
  console.log("connected");

  // Drop existing students
  await Users.deleteMany({});

  // Adds seed data to database
  await Users.collection.insertMany(users);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});