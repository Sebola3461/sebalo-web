import { Box, keyframes, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default ({ user, index }: any) => {
  const fadeLeft = keyframes`
  0% {
    opacity: 0;
    margin-left: 20px;
  }
  100% {
    opacity: 1;
    margin-left: 0px;
}`;

  const float = keyframes`    
  0% { transform: translate(0,  0px); }
  50%  { transform: translate(0, 15px); }
  100%   { transform: translate(0, -0px); } 
  `;

  return (
    <>
      <Paper
        sx={{
          width: `${index == 0 ? "90%" : "80%"}`,
          maxWidth: `${index == 0 ? "1080px" : "1000px"}`,
          height: `${index == 0 ? "80px" : "60px"}`,
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignContent: "center",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0px 1%",
          margin: "5px 0px",
          cursor: "pointer",
          animation: `${fadeLeft} 450ms ease-in-out`,
          ":hover": {
            bgcolor: "#414141",
          },
        }}
      >
        <Box
          sx={{
            width: `${index == 0 ? "60px" : "40px"}`,
            height: `${index == 0 ? "60px" : "40px"}`,
            margin: "10px",
            marginLeft: 0,
            borderRadius: 1,
            backgroundImage: `url(${user.user.avatar})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></Box>
        <Typography
          variant={`${index == 0 ? "h5" : "h6"}`}
          sx={{
            marginRight: "10px",
            color: `${index == 0 ? "#ffe8a7" : "#ffffff"}`,
          }}
        >
          #{user.rank}
        </Typography>
        <Typography variant="subtitle1">{user.user.username}</Typography>
        <Typography
          variant="subtitle2"
          sx={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          component="div"
        >
          lvl
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              marginLeft: "2px",
            }}
          >
            {user.level.level}
          </Typography>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            margin: "0 5px",
            opacity: 0.25,
          }}
        >
          /
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "flex-start",
            alignItems: "center",
            color: "#aaa",
          }}
          component="div"
        >
          {user.level.xp.toLocaleString("en-US")}
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              marginLeft: "2px",
              color: "#aaa",
            }}
          >
            xp
          </Typography>
        </Typography>
      </Paper>
    </>
  );
};
