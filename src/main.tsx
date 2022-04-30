import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import Levels from "./pages/Levels";
import ChannelLevels from "./pages/ChannelLevels";
import Authenticate from "./pages/Authenticate";
import Dashboard from "./pages/Dashboard";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/levels" element={<Levels />}>
            <Route index element={<Levels />} />
          </Route>
          <Route path="/levels/:channel" element={<ChannelLevels />}>
            <Route index element={<ChannelLevels />} />
          </Route>
          <Route path="/dashboard/:channel" element={<Dashboard />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/authorize" element={<Authenticate />}>
            <Route index element={<Authenticate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
