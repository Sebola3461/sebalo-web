import axios from "axios";

export default async (channel_id: string, token: string) => {
  try {
    const r = await axios(
      `https://api.twitch.tv/helix/users?login=${channel_id}`,
      {
        headers: {
          "client-id": process.env.TWITCH_WEB_CLIENT_ID,
          authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: 200,
      message: r.statusText,
      data: r.data,
    };
  } catch (e) {
    console.error(e);

    return {
      status: 401,
      message: e.statusText,
      data: [],
    };
  }
};
