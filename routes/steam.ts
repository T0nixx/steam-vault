import express from "express";
import axios from "axios";
import queryString from "query-string";

const STEAM_API_URL = "https://api.steampowered.com/";

export default (app: express.Express): void => {
  app.get("/api/get_user_profile/:steam_id", async (req, res) => {
    if (!req.params.steam_id) {
      res.redirect("/");
      return;
    }

    const steam_id = req.params.steam_id;
    const url = `${STEAM_API_URL}ISteamUser/GetPlayerSummaries/v2/?`;
    const query = queryString.stringify({
      key: process.env.STEAM_API_KEY,
      steamids: steam_id,
    });

    const response = await axios.get<SteamProfile>(url + query);
    const { steamid, avatarfull, personaname } = response.data.response.players[0];
    res.json({ steam_id: steamid, avatar: avatarfull, persona_name: personaname });
  });
};

interface SteamProfile {
  response: {
    players: {
      steamid: string;
      profileurl: string;
      avatar: string;
      avatarmedium: string;
      avatarfull: string;
      personaname: string;
    }[];
  };
}
