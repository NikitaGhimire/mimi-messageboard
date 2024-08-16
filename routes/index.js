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
router.get("/", async (req, res) => {
  const pool = req.pool;

  try {
    const { rows: messages } = await pool.query(
      "SELECT * FROM messages ORDER BY added DESC"
    );
    res.render("index", { title: "Mini Messageboard", messages });
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//new message form route: GET
router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

//new message form submission rute: POST
router.post("/new", async (req, res) => {
  const pool = req.pool;
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;

  //add message to array
  try {
    await pool.query(
      'INSERT INTO messages ("text", "user", "added") VALUES ($1, $2, $3)',
      [messageText, messageUser, new Date()]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
