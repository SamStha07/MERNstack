const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// we are using User.js from model to fetch users
const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    // identifies the user info and save it to our db
    (accessToken, refreshToken, profile, done) => {
      new User({
        googleId: profile.id,
      }).save(); //it will save it to the db
    }
  )
);
