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
  const title = "Task List";

  client.lrange("tasks", 0, -1, function (err, reply) {
    client.hgetall("call", function (err, call) {
      res.render("index", {
        title,
        tasks: reply,
        call,
      });
    });
  });
});

app.post("/task/add", (req, res) => {
  const task = req.body.task;
  client.rpush("tasks", task, (err, reply) => {
    if (err) {
      console.log(err);
    }
    console.log("Task added");
    res.redirect("/");
  });
});

app.post("/task/delete", function (req, res) {
  const tasksToDel = req.body.tasks;

  client.lrange("tasks", 0, -1, (err, tasks) => {
    for (var i = 0; i < tasks.length; i++) {
      if (tasksToDel.indexOf(tasks[i]) > -1) {
        client.lrem("tasks", 0, tasks[i], function () {
          if (err) {
            console.log(err);
          }
        });
      }
    }
    res.redirect("/");
  });
});

app.post("/call/add", function (req, res) {
  const newCall = {};
  const { name, company, phone, time } = req.body;
  newCall.name = name;
  newCall.company = company;
  newCall.time = time;
  newCall.phone = phone;

  client.hmset(
    "call",
    ["name", name, "company", company, "phone", phone, "time", time],
    (err, reply) => {
      if (err) {
        console.log(err);
      }
      console.log(reply);
      res.redirect("/");
    }
  );
});

app.listen(3000, () => console.log("Server on port 3000"));

module.exports = app;
