import { Box, Breadcrumbs, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Header from "../components/global/Header";
import LeftDrawer from "../components/global/LeftDrawer";
import LandingContainer from "../components/home/LandingContainer";
import {
  LeftSideMenuContext,
  LeftSideMenuContextProvider,
} from "../providers/SideMenus";
import { Link, useNavigate } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import UserLevelCard from "../components/levels/UserLevelCard";

export default () => {
  const [users, setUsers] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any>({});
  const navigate = useNavigate();

  const goTo = (route: string) => {
    navigate(route, { replace: false }), [navigate];
  };

  useEffect(() => {
    const channel = window.location.pathname
      .split("/")
      .filter((p) => p.trim() != "")
      .pop();

    fetch(`/api/channels/${channel}/levels`)
      .then((r) => {
        return r.json();
      })
      .then((levels) => {
        document.title = `${channel} | Levels`;
        setUsers(levels);
      });

    fetch(`/api/channels/${channel}/`)
      .then((r) => {
        return r.json();
      })
      .then((c) => {
        setChannelData(c.data);
      });
  }, []);

  return (
    <>
      <LeftSideMenuContextProvider>
        <Header></Header>
        <Paper
          sx={{
            margin: 5,
            padding: 2,
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          elevation={2}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignContent: "center",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FormatListBulletedIcon
              sx={{
                marginRight: 1,
              }}
            ></FormatListBulletedIcon>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography
                color="grey"
                onClick={() => {
                  goTo("/");
                }}
                variant="subtitle1"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Home
              </Typography>
              <Typography
                color="grey"
                onClick={() => {
                  goTo("/levels");
                }}
                variant="subtitle1"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Levels
              </Typography>
              <Typography color="text.primary">
                {users[0] ? users[0].level.channel.slice(1) : "Loading..."}
              </Typography>
            </Breadcrumbs>
          </Box>
          {/* <SearchField onEnter={updateValue}></SearchField> */}
        </Paper>
        <Paper
          sx={{
            margin: "40px",
            height: "200px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "130px",
              minHeight: "130px",
              backgroundImage: `url(${
                channelData.offline_cover
                  ? channelData.offline_cover
                  : "/src/images/default.png"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "5px 5px 0px 0px",
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              alignContent: "center",
              justifyContent: "flex-start",
              alignItems: "center",
              filter: "brightness(0.5)",
            }}
          ></Box>
          <Box
            sx={{
              width: "80%",
              height: "fit-content",
              margin: 10,
              marginTop: 0,
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignContent: "flex-start",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                backgroundImage: `url(${channelData.avatar})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginTop: -10,
                borderRadius: 5,
                zIndex: 99,
                border: "5px solid #3b3b3b",
              }}
            ></Box>
            <Typography
              variant="body1"
              component="p"
              sx={{
                marginLeft: 2,
                fontWeight: 500,
                fontSize: 30,
              }}
            >
              {channelData.display_name}
            </Typography>
          </Box>
        </Paper>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {users.map((u, i) => {
            return <UserLevelCard user={u} index={i}></UserLevelCard>;
          })}
        </Box>
        <LeftDrawer></LeftDrawer>
      </LeftSideMenuContextProvider>
    </>
  );
};
