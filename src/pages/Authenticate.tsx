import { useContext, useState } from "react";
import Header from "../components/global/Header";
import LeftDrawer from "../components/global/LeftDrawer";
import LandingContainer from "../components/home/LandingContainer";
import validateTwitchToken from "../helpers/validateTwitchToken";
import {
  LeftSideMenuContext,
  LeftSideMenuContextProvider,
} from "../providers/SideMenus";

export default () => {
  validateTwitchToken();
  return (
    <>
      <LeftSideMenuContextProvider>
        <Header></Header>
        <h1>aaa</h1>
        <LeftDrawer></LeftDrawer>
      </LeftSideMenuContextProvider>
    </>
  );
};
