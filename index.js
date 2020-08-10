const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config//keys");
const authRoutes = require("./routes/authRoutes");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//services
require("./services/passport");

const app = express();

//Route handler
authRoutes(app);

// process.env.PORT for production only
const PORT = process.env.PORT || 5000;
app.listen(PORT);
