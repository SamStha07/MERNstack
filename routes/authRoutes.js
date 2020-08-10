const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }) //will have access to profile and email
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // shows a user using cookies
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
