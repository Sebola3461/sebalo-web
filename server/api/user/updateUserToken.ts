import { Request, Response } from "express";
import { users } from "../../database";

export default async (req: Request, res: Response) => {
  try {
    const user = req.params.user;

    if (!req.body)
      return res.status(400).send({
        status: 400,
        message: "invalid user",
      });

    const { token } = req.body;

    if (!token)
      return res.status(400).send({
        status: 400,
        message: "Invalid token",
      });

    const db_user = (await users.find()).find((u) => u.twitch.channel == user);

    if (db_user == null)
      return res.status(404).send({
        status: 404,
        message: "User not found",
      });

    db_user.twitch["web_token"] = token;

    await users.findByIdAndUpdate(db_user._id, db_user);

    return res.status(200).send({
      status: 200,
      message: "Authorized!",
    });
  } catch (e) {
    console.error(e);

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
    });
  }
};
