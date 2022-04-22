import { useContext, useState } from "react";
import Header from "../components/global/Header";
import LeftDrawer from "../components/global/LeftDrawer";
import LandingContainer from "../components/home/LandingContainer";
import {
  LeftSideMenuContext,
  LeftSideMenuContextProvider,
} from "../providers/SideMenus";

export default () => {
  return (
    <>
      <LeftSideMenuContextProvider>
        <Header></Header>
        <LandingContainer></LandingContainer>
        <LeftDrawer></LeftDrawer>
      </LeftSideMenuContextProvider>
    </>
  );
};
