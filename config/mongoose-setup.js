const mongoose = require("mongoose");

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/coinscrape", { useMongoClient: true })
  .then(() => {
      console.log("Mongoose connected");
  })
  .catch((err) => {
      console.log("Mongoose connection failed.");
      console.log(err);
  });
