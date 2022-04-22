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
import SearchField from "../components/global/SearchField";
import ChannelLevelCard from "../components/levels/ChannelLevelCard";
import { channel } from "diagnostics_channel";
import UserLevelCard from "../components/levels/UserLevelCard";

export default () => {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  const goTo = (route: string) => {
    navigate(route, { replace: false }), [navigate];
  };

  useEffect(() => {
    const channel = window.location.pathname.split("/").pop();

    fetch(`/api/channels/${channel}/levels`)
      .then((r) => {
        return r.json();
      })
      .then((levels) => {
        document.title = `${channel} | Levels`;
        setUsers(levels);
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
          {users.map((u) => {
            return <UserLevelCard user={u}></UserLevelCard>;
          })}
        </Box>
        <LeftDrawer></LeftDrawer>
      </LeftSideMenuContextProvider>
    </>
  );
};
