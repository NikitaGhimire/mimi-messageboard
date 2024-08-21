//initialise the router
const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.render("homePage", { title: "Nikitas Mini Messageboard app" });
});

module.exports = homeRouter;
