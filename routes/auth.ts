import express from "express";
import passport from "passport";

export default (app: express.Express): void => {
  app.get("/api/login", passport.authenticate("steam", { session: false }));

  app.get("/api/login/return", passport.authenticate("steam", { session: false }), (req, res) => {
    if (req.user) {
      res.json({ steam_id: req.user.id });
      return;
    }
    res.redirect("/api/login");
  });
};
