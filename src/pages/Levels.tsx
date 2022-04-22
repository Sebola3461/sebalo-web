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

export default () => {
  const [rawChannels, setRawChannels] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const navigate = useNavigate();

  document.title = `Sebola | Leaderboards`;

  const goTo = (route: string) => {
    navigate(route, { replace: false }), [navigate];
  };

  const updateValue = (value: any) => {
    updateSearchChannels(value);
  };

  useEffect(() => {
    fetch("/api/levels")
      .then((r) => {
        return r.json();
      })
      .then((levels) => {
        setRawChannels(levels);
        setChannels(levels);
      });
  }, []);

  function updateSearchChannels(search: any) {
    console.log(rawChannels);
    const search_channels = rawChannels.filter((c: any) => {
      return c.channel
        .slice(1)
        .toLowerCase()
        .trim()
        .startsWith(search.toLowerCase());
    });

    console.log(search_channels);

    if (search == "") return setChannels(rawChannels);

    setChannels(search_channels);
  }

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
              <Typography color="text.primary">Levels</Typography>
            </Breadcrumbs>
          </Box>
          <SearchField onEnter={updateValue}></SearchField>
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
          {channels.map((c, i) => {
            return <ChannelLevelCard channel={c} index={i}></ChannelLevelCard>;
          })}
        </Box>
        <LeftDrawer></LeftDrawer>
      </LeftSideMenuContextProvider>
    </>
  );
};
