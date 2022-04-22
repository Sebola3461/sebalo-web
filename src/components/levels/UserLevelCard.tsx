import { keyframes, Paper, Typography } from "@mui/material";

export default ({ user }: any) => {
  const fadeLeft = keyframes`
  0% {
    opacity: 0;
    margin-left: 20px;
  }
  100% {
    opacity: 1;
    margin-left: 0px;
}`;

  return (
    <>
      <Paper
        sx={{
          width: "80%",
          maxWidth: "1000px",
          height: "40px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignContent: "center",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0px 1%",
          margin: "5px 0px",
          cursor: "pointer",
          animation: `${fadeLeft} 450ms linear`,
          ":hover": {
            bgcolor: "#414141",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginRight: "10px",
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
