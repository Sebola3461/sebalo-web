import { keyframes, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default ({ channel, index }: any) => {
  const navigate = useNavigate();

  const fadeLeft = keyframes`
  0% {
    opacity: 0;
    margin-left: 20px;
  }
  100% {
    opacity: 1;
    margin-left: 0px;
}`;

  const goTo = (route: string) => {
    navigate(route, { replace: false }), [navigate];
  };

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
        onClick={() => {
          goTo(`/levels/${channel.channel.slice(1)}`);
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginRight: "10px",
          }}
        >
          #{channel.rank}
        </Typography>
        <Typography variant="subtitle1">{channel.channel.slice(1)}</Typography>
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
          {channel.xp.toLocaleString("en-US")}
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
