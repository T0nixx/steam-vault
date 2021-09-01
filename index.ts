import express from "express";
import passport from "passport";
import { Profile, Strategy as SteamStragtegy } from "passport-steam";
import authRoutes from "./routes/auth";
import steamRoutes from "./routes/steam";
import "dotenv/config";

const app = express();

app.use(express.json());
passport.use(
  new SteamStragtegy(
    {
      returnURL: process.env.HOST_URL + "api/login/return",
      realm: process.env.HOST_URL,
      apiKey: process.env.STEAM_API_KEY,
      profile: false,
    },
    (identifier: string, _profile: Profile, done: (err: any, user: any) => void) => {
      process.nextTick(() => {
        const splitted = identifier.split("/");
        const steamId = splitted[splitted.length - 1];
        return done(null, { id: steamId });
      });
    },
  ),
);

passport.use(
  new SteamStragtegy(
    {
      returnURL: process.env.HOST_URL + "api/login/return",
      realm: process.env.HOST_URL,
      apiKey: process.env.STEAM_API_KEY,
      profile: false,
    },
    (identifier: string, _profile: Profile, done: (err: any, user: any) => void) => {
      process.nextTick(() => {
        const splitted = identifier.split("/");
        const steamId = splitted[splitted.length - 1];
        return done(null, { id: steamId });
      });
    },
  ),
);

app.use(passport.initialize());

app.listen(4000, () => {
  console.log("Express server has started on port 4000.");
});

authRoutes(app);
steamRoutes(app);
