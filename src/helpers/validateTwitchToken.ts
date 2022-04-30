export default async () => {
  const token = window.location.hash.slice(1).split("=")[1].split("&")[0];

  const request = await fetch("https://id.twitch.tv/oauth2/validate", {
    headers: { Authorization: `OAuth ${token}` },
  });
  const response = await request.json();
  localStorage["twitch_data"] = JSON.stringify(response);

  const update_request = await fetch(`/api/users/${response.login}/token`, {
    method: "post",
    headers: {
      Authorization: `${localStorage["twitch_token"]}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });

  const update_response = await update_request.json();

  if (update_response.status != 200) return alert(update_response.message);

  localStorage["twitch_token"] = token;

  window.location.replace("/");
};
