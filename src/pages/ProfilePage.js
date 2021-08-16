import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import UserCard from "../components/Profile/UserCard";
import { Modal, Button } from "react-bootstrap";
import { StyledProfile as SP } from "../components/Profile/EditStyling";
const ProfilePage = () => {
  //   const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [state, setState] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    confirmPassword: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onNo = () => {
    setShowEditProfile(false);
  };

  const handleShowEditProfile = () => {
    setShowEditProfile(true);
  };

  const handlePasswordSubmit = (e) => {
    if (state.password !== state.confirmPassword) {
      e.preventDefault();
      setError((state) => ({
        ...state,
        password: "Password and confirm password do not match",
      }));
      return;
    }
    if (state.password === user.password) {
      e.preventDefault();
      setError((state) => ({
        ...state,
        password: "You entered old password",
      }));
      return;
    }
    e.preventDefault();
    setShowEditPassword(false);
  };

  const handleProfileSubmit = (e) => {
    localStorage.setItem(`user/${user.email}`, JSON.stringify(state));
  };
  const ErrorMessageEmail = (
    <>
      <SP.ErrorMessage type="invalid">{error.email}</SP.ErrorMessage>
      <br />
    </>
  );
  const ErrorMessagePassword = (
    <>
      <SP.ErrorMessage type="invalid">{error.password}</SP.ErrorMessage>
      <br />
    </>
  );

  return (
    <div>
      <center>
        <UserCard handleShowEditProfile={handleShowEditProfile} user={user} />
      </center>
      <SP.Modal show={showEditProfile}>
        <Modal.Title>
          <center>Edit Profile</center>
        </Modal.Title>
        <Modal.Body>
          <center>
            <SP.Form onSubmit={handleProfileSubmit}>
              <SP.FormControl
                required
                name="email"
                type="email"
                value={state.email}
                onChange={handleChange}
                placeholder="name@example.com"
              />
              {error.email !== "" ? ErrorMessageEmail : ""}
              <SP.FormControl
                required
                name="name"
                type="text"
                value={state.name}
                onChange={handleChange}
                placeholder="Full name"
              />

              <Modal.Footer>
                <SP.ModalFooterButton type="submit" variant="success">
                  Finish
                </SP.ModalFooterButton>
                <SP.ModalFooterButton
                  variant="warning"
                  onClick={() => setShowEditPassword(true)}
                >
                  Change password
                </SP.ModalFooterButton>
                <SP.ModalFooterButton variant="danger" onClick={onNo}>
                  Cancel
                </SP.ModalFooterButton>
              </Modal.Footer>
            </SP.Form>
          </center>
        </Modal.Body>
      </SP.Modal>
      {/* edit password */}
      <SP.Modal show={showEditPassword}>
        <Modal.Title>
          <center>Edit Profile</center>
        </Modal.Title>
        <Modal.Body>
          <center>
            <SP.Form onSubmit={handlePasswordSubmit}>
              <SP.FormControl
                required
                name="password"
                type="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Password"
              />

              {error.password !== "" ? ErrorMessagePassword : ""}
              <SP.FormControl
                required
                name="confirmPassword"
                type="password"
                value={state.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />

              {error.password !== "" ? ErrorMessagePassword : ""}

              <Modal.Footer>
                <SP.ModalFooterButton type="submit" variant="success">
                  Finish
                </SP.ModalFooterButton>
                <SP.ModalFooterButton
                  variant="danger"
                  onClick={() => {
                    setShowEditPassword(false);
                  }}
                >
                  Cancel
                </SP.ModalFooterButton>
              </Modal.Footer>
            </SP.Form>
          </center>
        </Modal.Body>
      </SP.Modal>
    </div>
  );
};

export default ProfilePage;
