import express from "express";
import passport from "passport";
import { Profile, Strategy as SteamStragtegy } from "passport-steam";
import authRoutes from "./routes/auth";
import steamRoutes from "./routes/steam";
import "dotenv/config";
import { connect } from "mongoose";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

passport.use(
  new SteamStragtegy(
    {
      returnURL: process.env.HOST_URL + "/api/login/return",
      realm: process.env.HOST_URL,
      apiKey: process.env.STEAM_API_KEY,
    },
    (identifier: string, _profile: Profile, done: (err: any, user: any) => void) => {
      process.nextTick(() => {
        const splitted = identifier.split("/");
        const steam_id = splitted[splitted.length - 1];
        return done(null, { id: steam_id });
      });
    },
  ),
);
app.use(passport.initialize());
connect(process.env.MONGO_URI)
  .then(() => console.log(`Connected to MongoDB 🔥`))
  .catch((err: Error) => console.error(`MONGO CONNECT ERROR: ${err.message}`));

app.listen(4000, () => {
  console.log("Express server has started on port 4000.");
});

authRoutes(app);
steamRoutes(app);
