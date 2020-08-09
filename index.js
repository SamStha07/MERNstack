const express = require("express");
const app = express();

// router handler
app.get("/", (req, res) => {
  res.send("Hello, there");
});

const PORT = process.env.PORT || 5000; // process.env.PORT for production only
app.listen(PORT);
