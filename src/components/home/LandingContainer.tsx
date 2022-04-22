import { keyframes } from "@emotion/react";
import { Box, Typography, Button } from "@mui/material";

export default () => {
  const mesh = keyframes`
    0% {
      background-position-y: 0;
    }
    100% {
      background-position-y: -2008px;
    }`;

  const fadeLeft = keyframes`
    0% {
      opacity: 0;
      margin-left: 20px;
    }
    100% {
      opacity: 1;
      margin-left: 0px;
  }`;

  const fadeLeftDelay = keyframes`
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
      margin-left: 20px;
    }
    100% {
      opacity: 1;
      margin-left: 0px;
  }`;

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          background: "url(/src/images/triangles.svg)",
          backgroundSize: "2008px",
          animation: `${mesh} 20s linear`,
          animationIterationCount: "infinite",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, #8479E1 60%, rgba(0,212,255,0) 100%)",
        }}
      ></Box>
      <Box
        sx={{
          zIndex: 999,
          width: "100%",
          height: "calc(100vh - 65px)",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          alignItems: "flex-start",
          backgroundColor: "#8479E1",
          "@media (max-width: 795px)": {
            alignItems: "center",
            textAlign: "center",
          },
        }}
      >
        <Box
          sx={{
            zIndex: 999,
            width: "90%",
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "flex-start",
            margin: 10,
            "@media (max-width: 795px)": {
              alignItems: "center",
              textAlign: "center",
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: 110,
              color: "secondary.main",
              width: "fit-content",
              animation: `${fadeLeft} 2s linear`,
              fontWeight: 500,
              "@media (max-width: 795px)": {
                fontSize: 80,
              },
            }}
          >
            Sebola
          </Typography>
          <br></br>
          <Typography
            variant="h1"
            sx={{
              fontSize: 80,
              color: "#ffffff",
              width: "fit-content",
              animation: `${fadeLeftDelay} 2s linear`,
              fontWeight: 500,
              "@media (max-width: 795px)": {
                fontSize: 50,
              },
            }}
          >
            A simple osu! bot
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: 250,
            fontSize: 15,
            marginLeft: 10,
            "@media (max-width: 795px)": {
              width: "90%",
              marginLeft: 0,
            },
          }}
          href="https://osu.ppy.sh/oauth/authorize?response_type=code&redirect_uri=https://sebola-twitch-authorization.herokuapp.com/osu&client_id=14230"
        >
          Add me to your chat
        </Button>
      </Box>
    </>
  );
};
