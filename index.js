const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
const authRoutes = require("./routes/authRoutes");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//services
require("./services/passport");

const app = express();

// inorder to run serializeUser and deserializeUser to enable cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000, //automatically expires in 30days in ms
    keys: [keys.cookieKey], //randomly generated in keys
  })
);
// then essentially telling passport to use cookies to manage our authentication
app.use(passport.initialize());
app.use(passport.session());

//Route handler
authRoutes(app);

// process.env.PORT for production only
const PORT = process.env.PORT || 5000;
app.listen(PORT);
