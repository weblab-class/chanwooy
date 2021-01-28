/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//create models
const AboutSection = require("./models/aboutsection.js");
const Module = require("./models/module.js");
const Resource = require("./models/resource.js");
const GameResource = require("./models/gameresource.js");
const RecycleLog = require("./models/recyclelog.js");


//initialize socket
const socketManager = require("./server-socket");
const { db } = require("./models/user");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/module", (req, res) => {
  Module.find({}).then((modules) => {
    res.send(modules);
  });
});

router.post("/module", (req, res) => {
  const newModuleInfo = new Module({
    title: req.body.title,
    content: req.body.content,
    moduleNumber: req.body.moduleNumber,
    nth: req.body.nth,
  });
  newModuleInfo.save().then((newModule) => {
    res.send(newModule);
  });
});

//no post method for module

//info is a text I will put in the database.
router.get("/aboutsection", (req, res) => {
  // res.send("hello");
  AboutSection.find({}).then((info) => {
    res.send(info);
  });
});

router.post("/aboutsection", (req, res) => {
  const newInfo = new AboutSection({
    heading: req.body.heading,
    content: req.body.content,
  });

  newInfo.save().then((story) => res.send(story));
});

router.get("/log", (req, res) => {
  // res.send("hello");
  RecycleLog.find({}).then((logs) => {
    res.send(logs);
  });
});

router.post("/log", (req, res) => {
    const log = new RecycleLog({
      recycled: req.body.recycled,
      date: req.body.date,
      googleid: req.body.googleId,
    });
    
    log.save().then(() => {res.send(log);});
  });
  
// });

//not needed as of now
router.get("/usermodule", (req, res) => {
  User.find({ googleid: req.query.googleid }).then((user) => {
    res.send(user);
  });
});

router.get("/resource", (req, res) => {
  Resource.find({}).then((resourceList) => {
    res.send(resourceList);
  });
});

router.get("/game", (req, res) => {
  GameResource.find({}).then((gameResource) => {
    res.send(gameResource);
  });
});



// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
