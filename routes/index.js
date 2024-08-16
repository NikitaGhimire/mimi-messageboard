//initialise the router
const express = require("express");
const router = express.Router();

//set up sample message
const messages = [
  {
    text: "Hi there",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello world",
    user: "Charles",
    added: new Date(),
  },
];

//set up the index route
router.get("/", (req, res) => {
  res.render("index", { title: "Mini messageboard", messages: messages });
});

//new message form route: GET
router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

//new message form submission rute: POST
router.post("/new", (req, res) => {
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;

  //add message to array
  messages.push({ text: messageText, user: messageUser, added: new Date() });

  //redirect to the index page
  res.redirect("/");
});

module.exports = router;
