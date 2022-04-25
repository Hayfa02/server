const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/miniFoot').then(() => {
  console.log("Successfully connected to the database");
})
  .catch((err) => {
    console.log("Could not connect to the database. Error...");
    process.exit();
  });