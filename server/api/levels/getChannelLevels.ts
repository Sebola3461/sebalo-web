import { Request, Response } from "express";
import { twitchUsers, users } from "../../database";

export default async (req: Request, res: Response) => {
  const channel = req.params["channel"];
  const _users = await twitchUsers.find();
  const _channel = (await users.find()).filter(
    (u) => u.twitch.channel == channel.toLowerCase()
  )[0];

  if (!_channel)
    return res.status(404).send({
      status: 404,
      message: "Channel not found",
    });

  const channel_users: any[] = [];
  _users.forEach((u) => {
    u.levels.forEach((l) => {
      if (l.channel.slice(1) == channel) {
        channel_users.push({
          user: {
            _id: u._id,
            username: u.username,
            avatar: u.avatar,
          },
          level: l,
        });
      }
    });
  });

  channel_users.sort((a, b) => b.level.xp - a.level.xp);

  channel_users.forEach((u, i) => {
    channel_users[i]["xp"] = u.level.xp;
    channel_users[i]["rank"] = i + 1;
  });

  res.send(channel_users);
};
