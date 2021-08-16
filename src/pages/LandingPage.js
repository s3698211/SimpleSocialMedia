import React from "react";

import { StyledLandingPage as slp } from "./LandingPageStyling";
import { Button } from "react-bootstrap";
import { GoDesktopDownload } from "react-icons/go";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <slp.Container>
      <center>
        <slp.Header1>Welcome to Simple Social App</slp.Header1>
        <Link to="/home">
          <slp.Button variant="success">
            Go to HomePage <GoDesktopDownload />{" "}
          </slp.Button>
        </Link>
      </center>
    </slp.Container>
  );
}

export default LandingPage;
