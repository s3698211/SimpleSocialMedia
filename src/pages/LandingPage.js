import React, { useState, useEffect } from "react";

import { StyledLandingPage as slp } from "./LandingPageStyling";
import { Button } from "react-bootstrap";
import { GoDesktopDownload } from "react-icons/go";
import { Link } from "react-router-dom";
import { Collapse } from "@material-ui/core";
function LandingPage() {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <slp.Container>
      <Collapse
        in={checked}
        {...(true ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <slp.Header1>Welcome to Simple Social App</slp.Header1>
        <center>
          {" "}
          <Link to="/home">
            <slp.Button>
              Go to HomePage <GoDesktopDownload />
            </slp.Button>
          </Link>
        </center>
      </Collapse>
    </slp.Container>
  );
}

export default LandingPage;
