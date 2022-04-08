import axios from "axios";
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { SteamProfile, steam_profile_model } from "../models/steam-profile.model";

export default (app: express.Express): void => {
  app.get("/api/login", passport.authenticate("steam", { session: false }));

  app.get(
    "/api/login/return",
    passport.authenticate("steam", { session: false }),
    async (req, res) => {
      if (req.user) {
        const { data } = await axios.get<SteamProfile>(
          `${process.env.HOST_URL}/api/get_steam_profile/${req.user.id}`,
        );

        const find_result = await steam_profile_model.findOne(data).exec();
        if (!find_result) {
          await new steam_profile_model(data).save();
        }

        res.render("authenticated", { data, client_url: process.env.CLIENT_URL });
        return;
      }
      res.redirect("/api/login");
    },
  );
};
