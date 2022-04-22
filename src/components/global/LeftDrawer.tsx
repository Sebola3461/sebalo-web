import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { LeftSideMenuContext } from "../../providers/SideMenus";
import { useNavigate } from "react-router-dom";

export default () => {
  let { expanded, setExpanded } = React.useContext(LeftSideMenuContext);
  const navigate = useNavigate();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setExpanded(open);
    };

  const goTo = (route: string) => {
    navigate(route, { replace: false }), [navigate];
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          {
            text: "Home",
            link: () => {
              goTo("/");
            },
          },
          {
            text: "Dashboard",
            link: () => {
              goTo("/dashboard");
            },
          },
          {
            text: "Levels",
            link: () => {
              goTo("/levels");
            },
          },
        ].map((option, index) => (
          <ListItem button key={option.text} onClick={option.link}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={option.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <SwipeableDrawer
          anchor={"left"}
          open={expanded}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
