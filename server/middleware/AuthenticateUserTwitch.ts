import { NextFunction, Response, Request, json } from "express";
import { users } from "../database";

export default async (req: Request, res: Response, next: NextFunction) => {
  const user = req.params.user;
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.status(401).send({
      status: 401,
      message: "Unauthorized",
    });

  if (!user)
    return res.status(422).send({
      status: 422,
      message: "Invalid user",
    });

  const db_user = (await users.find()).find((u) => u.twitch.channel == user);

  if (!db_user)
    return res.status(404).send({
      status: 404,
      message: "User not found",
    });

  if (authorization != db_user.twitch.web_token)
    return res.status(401).send({
      status: 401,
      message: "Unauthorized",
    });

  next();
};
