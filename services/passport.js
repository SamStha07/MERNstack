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
    async (accessToken, refreshToken, profile, done) => {
      // we are creating query inorder to check if the user has before logged in or not
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with given prfile ID
        return done(null, existingUser);
      }
      // we don't have a user record with this ID, make a new record!
      const user = await new User({ googleId: profile.id }).save(); //it will save it to the db
      done(null, existingUser);
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
    async (accessToken, refreshToken, profile, done) => {
      // we are creating query inorder to check if the user has before logged in or not
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        // we already have a record with given prfile ID
        return done(null, existingUser);
      }
      // we don't have a user record with this ID, make a new record!
      const user = await new User({ facebookId: profile.id }).save(); //it will save it to the db
      done(null, existingUser);
    }
  )
);
