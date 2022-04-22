import { Express } from "express";
import getChannelInfo from "./levels/getChannelInfo";
import getChannelLevels from "./levels/getChannelLevels";
import getLevelsRank from "./levels/getLevelsRank";

export default (router: Express) => {
  router.get("/api/levels", getLevelsRank);
  router.get("/api/channels/:channel/", getChannelInfo);
  router.get("/api/channels/:channel/levels", getChannelLevels);
};
