import { Request, Response } from "express";
import { users } from "../../../database";

export default async (req: Request, res: Response) => {
  const { data } = req.body;
  const channel = req.params.channel;

  if (!data)
    return res.status(400).send({
      status: 400,
      message: "Invalid data provided",
    });

  if (!data.pause || typeof data.pause != "boolean")
    return res.status(400).send({
      status: 400,
      message: "Invalid status value provided",
    });

  if (
    !data.message ||
    typeof data.message != "string" ||
    data.message.length > 120
  )
    return res.status(400).send({
      status: 400,
      message: "Message length too big! Max 120 characters",
    });

  const db_channel = await users.findById(channel);

  db_channel.twitch_options.pause = data.pause;
  db_channel.twitch_options.messages.paused = data.message;

  await users.findByIdAndUpdate(channel, db_channel);

  return res.status(200).send({
    status: 200,
    message: "Option updated!",
  });
};
