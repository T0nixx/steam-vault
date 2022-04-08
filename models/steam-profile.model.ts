import { Schema, model } from "mongoose";

export interface SteamProfile {
  steam_id: string;
  avatar: string;
  persona_name: string;
}

const schema = new Schema<SteamProfile>({
  steam_id: { type: String },
  avatar: { type: String },
  persona_name: { type: String },
});

export const steam_profile_model = model<SteamProfile>("SteamProfile", schema);
