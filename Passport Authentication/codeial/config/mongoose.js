const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codeial");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to db"));

db.once("open", function () {
  console.log("successfull connected to the database")
  ;
});


module.exports=db;