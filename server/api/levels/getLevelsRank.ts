import { Request, Response } from "express";
import { twitchUsers, users } from "../../database";

export default async (req: Request, res: Response) => {
  const _users = await twitchUsers.find();

  const levels: any[] = [];
  _users.forEach((u) => {
    u.levels.forEach((l) => {
      const user_level = u.levels.filter((lvl) => lvl.channel == l.channel)[0];

      if (levels.filter((lv) => lv.channel == l.channel).length == 0) {
        levels.push({
          channel: l.channel,
          xp: user_level ? user_level.xp : 0,
          users: [u],
        });
      } else {
        const channelIndex = levels.findIndex((lv) => lv.channel == l.channel);

        levels[channelIndex].xp += user_level.xp;
        levels[channelIndex].users.push(u);
      }
    });
  });

  levels.sort((a, b) => b.xp - a.xp);

  levels.forEach((l, i) => {
    levels[i]["rank"] = i + 1;
  });

  res.send(levels);
};
