const mongoose = require("mongoose");
require("dotenv").config();
const connectToMongo = () => {
  const mongoURI = process.env["MONGODB_URI"];
  console.log("db connection");
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("connected to Mongo successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToMongo;
