//initialise the router
const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

//set up the index route
router.get("/", async (req, res) => {
  const pool = req.pool;

  try {
    const { rows: messages } = await pool.query(
      "SELECT * FROM messages ORDER BY added DESC"
    );
    res.render("index", { title: "All messages", messages });
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

//delete
router.post("/:id/delete", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM messages WHERE id=$1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).send("Message not found");
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error: " + err);
  }
});

module.exports = router;
