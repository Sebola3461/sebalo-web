import { NextFunction, Response, Request, json } from "express";
import { users } from "../database";
import getChannelEditors from "../helpers/getChannelEditors";
import getUserData from "../helpers/getUserData";

export default async (req: Request, res: Response, next: NextFunction) => {
  const channel = req.params.channel;
  const authorization = req.headers.authorization;
  const user = req.query["user_id"];

  if (!authorization)
    return res.status(401).send({
      status: 401,
      message: "Unauthorized",
    });

  if (!user)
    return res.status(422).send({
      status: 422,
      message: "Invalid user_id",
    });

  const db_channel = await users.findById(channel);

  if (db_channel == null)
    return res.status(404).send({
      status: 404,
      message: "Channel not found",
    });

  const author_db = await users.findById(user.toString());

  if (author_db == null)
    return res.status(422).send({
      status: 422,
      message: "User not found",
    });

  if (
    authorization != author_db.twitch.web_token ||
    author_db.twitch.web_token == ""
  )
    return res.status(401).send({
      status: 401,
      message: "Unauthorized",
    });

  const user_info = await getUserData(db_channel.twitch.channel, authorization);

  if (user_info.status != 200)
    return res.status(user_info.status).send({
      status: user_info.status,
      message: user_info.message,
    });

  const channel_managers = await getChannelEditors(
    user_info.data.data[0].id,
    authorization
  );

  if (channel_managers.status != 200)
    return res.status(channel_managers.status).send({
      status: channel_managers.status,
      message: channel_managers.message,
    });

  const author_in_channel_managers = channel_managers.data.data.find(
    (u: { user_id: string }) => u.user_id == user.toString()
  );

  if (!author_in_channel_managers && user.toString() != channel)
    return res.status(401).send({
      status: 401,
      message: "This user isn't a channel manager",
    });

  next();
};
