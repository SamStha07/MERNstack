const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }) //will have access to profile and email
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] }) //will have access to profile and email
  );

  app.get("/auth/facebook/callback", passport.authenticate("facebook"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // shows a user using cookies
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
