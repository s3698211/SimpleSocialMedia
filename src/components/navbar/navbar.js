import React, { useState, useEffect } from "react";
import { StyledNavbar as SN } from "./NavStyling";
import { Route, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavbarComponent = () => {
  const history = useHistory();
  const [reRender, SetReRender] = useState(false);
  const [show, setShow] = useState(false);

  const currentUser =
    localStorage.getItem("currentUser") !== ""
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null;
  useEffect(() => {}, [reRender]);

  const onYes = () => {
    localStorage.setItem("currentUser", "");
    setShow(false);
    history.push("/");
  };
  const onNo = () => {
    setShow(false);
  };
  const handleSubmit = () => {
    alert("Login Successful");
    history.push("/home");
  };

  const logOut = async () => {
    setShow(true);
  };

  return (
    <SN.Navbar bg="dark" variant="dark">
      <SN.Container>
        <SN.Link to="/">
          <SN.Brand>Vibe Check</SN.Brand>
        </SN.Link>

        <SN.Nav className="me-auto">
          <SN.Link to="/home">
            <SN.Button variant="dark">Home</SN.Button>
          </SN.Link>

          <SN.Link to="/register">
            <SN.Button variant="dark">Register</SN.Button>
          </SN.Link>

          {currentUser ? (
            <SN.Button onClick={logOut} variant="dark">
              Logout
            </SN.Button>
          ) : (
            <SN.Link to="/login">
              <SN.Button variant="dark">Login</SN.Button>
            </SN.Link>
          )}
          {currentUser ? (
            <SN.Link to={`/profile/${currentUser.name}`}>
              <SN.Button variant="dark">{currentUser.name}</SN.Button>
            </SN.Link>
          ) : (
            ""
          )}
        </SN.Nav>
      </SN.Container>
      <Modal show={show}>
        <Modal.Body>
          <center>Are you sure</center>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={onYes}>
            Yes
          </Button>
          <Button color="secondary" onClick={onNo}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </SN.Navbar>
  );
};

export default function NavRoute({ exact, path, component: Component }) {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <div>
          <NavbarComponent />
          <Component {...props} />
          {/* <div>,e</div> */}
        </div>
      )}
    />
  );
}
