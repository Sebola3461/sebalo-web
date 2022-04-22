import axios from "axios";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    const user = req.params["channel"];

    if (!process.env.twitch_token)
      return res.status(500).send({
        status: 500,
        message: "Server starting. Try again later",
      });

    const channel_data = await axios(
      `https://api.twitch.tv/helix/users?login=${user}`,
      {
        headers: {
          "client-id": process.env.TWITCH_CLIENT_ID,
          authorization: `Bearer ${process.env.twitch_token}`,
        },
      }
    );

    if (channel_data.status != 200)
      return res.status(channel_data.status).send(channel_data.data);

    console.log(channel_data.data);

    return res.status(200).send({
      status: 200,
      data: {
        id: channel_data.data.data[0].id,
        login: channel_data.data.data[0].login,
        display_name: channel_data.data.data[0].display_name,
        avatar: channel_data.data.data[0].profile_image_url,
        offline_cover: channel_data.data.data[0].offline_image_url,
      },
    });
  } catch (e) {
    return res.status(500).send({
      status: 500,
      message: "Internal server error.",
    });
  }
};
