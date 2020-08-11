const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// we are using User.js from model to fetch users
const User = mongoose.model("users");

// serializing inorder to generate the identifying piece of info into the cookie
passport.serializeUser((user, done) => {
  // user.id=user model id from db
  done(null, user.id);
});

// pulls back out and turn it back into user at some point in future
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    // identifies the user info and save it to our db
    (accessToken, refreshToken, profile, done) => {
      // we are creating query inorder to check if the user has before logged in or not
      User.findOne({ googleId: profile.id }).then((exisitingUser) => {
        if (exisitingUser) {
          // we already have a record with given prfile ID
          done(null, exisitingUser);
        } else {
          // we don't have a user record with this ID, make a new record!
          new User({
            googleId: profile.id,
          })
            .save() //it will save it to the db
            .then((user) => done(null, user));
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookID,
      clientSecret: keys.facebookSecret,
      callbackURL: "/auth/facebook/callback",
    },
    // identifies the user info and save it to our db
    (accessToken, refreshToken, profile, done) => {
      // we are creating query inorder to check if the user has before logged in or not
      User.findOne({ facebookId: profile.id }).then((exisitingUser) => {
        if (exisitingUser) {
          // we already have a record with given prfile ID
          done(null, exisitingUser);
        } else {
          // we don't have a user record with this ID, make a new record!
          new User({
            facebookId: profile.id,
          })
            .save() //it will save it to the db
            .then((user) => done(null, user));
        }
      });
    }
  )
);
