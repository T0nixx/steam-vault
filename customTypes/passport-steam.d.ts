declare module "passport-steam" {
  import passport from "passport";
  import express from "express";

  interface Profile {
    displayName?: string;
    emails: { value?: string }[];
    name: { familyName?: string; givenName?: string };
  }

  interface SteamStrategyOptionBase {
    providerURL?: strting;
    profile?: boolean;
    apiKey?: string;
    realm: string;
    returnURL: string;
  }

  interface SteamStrategyOption extends SteamStrategyOptionBase {
    passReqToCallback?: false;
  }

  interface SteamStragtegyOptionWithRequest extends SteamStrategyOptionBase {
    passReqToCallback: true;
  }

  declare class Strategy extends passport.Strategy {
    constructor(
      options: SteamStrategyOption,
      validate: (
        identifier: string,
        profile: Profile,
        done: (error: any, user?: any) => void,
      ) => void,
    );
    constructor(
      options: SteamStragtegyOptionWithRequest,
      validate: (
        req: express.Request,
        identifier: string,
        profile: Profile,
        done: (error: any, user?: any) => void,
      ) => void,
    );

    name: string;
    authenticate(req: express.Request, options?: any): void;
  }
}
