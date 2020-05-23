const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const redis = require("redis");
const ejs = require("ejs");
const app = express();

//create client
const client = redis.createClient();
client.on("connect", function () {
  console.log("Redis server connected...");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => console.log("Server on port 3000"));

module.exports = app;
