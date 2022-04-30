import { Express, json } from "express";
import AuthenticateDashboardUser from "../middleware/AuthenticateDashboardUser";
import AuthenticateUserTwitch from "../middleware/AuthenticateUserTwitch";
import updateChannelSettings from "./channel/updateChannelSettings";
import getChannelInfo from "./levels/getChannelInfo";
import getChannelLevels from "./levels/getChannelLevels";
import getLevelsRank from "./levels/getLevelsRank";
import updateUserToken from "./user/updateUserToken";

export default async (router: Express) => {
  router.get("/api/levels", getLevelsRank);
  router.get("/api/channels/:channel/", getChannelInfo);
  router.get("/api/channels/:channel/levels", getChannelLevels);
  router.post(
    "/api/users/:user/token",
    json(),
    AuthenticateUserTwitch,
    updateUserToken
  );
  router.post(
    "/api/channels/:channel/settings/update",
    json(),
    AuthenticateDashboardUser,
    updateChannelSettings
  );
};
