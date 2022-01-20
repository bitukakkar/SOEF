import React, { memo } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Logo from "../assets/LOGO_White.png";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <a href="https://fetch.ai">
          <img alt="" src={Logo} style={{ width: "72%" }} />
        </a>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
