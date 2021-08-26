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
    confirmPassword: "",
    name: user.name,
    join: user.join,
    post: user.post,
    avatar: user.avatar,
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
    //delete the old user's version
    localStorage.removeItem(`user/${user.email}`);
    //create a new one
    localStorage.setItem(`user/${state.email}`, JSON.stringify(state));
    //update current user as well
    localStorage.setItem("currentUser", JSON.stringify(state));

    //update user info on post as well
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).includes(`post/${user.email}`)) {
        let key = localStorage.key(i);
        let post = JSON.parse(localStorage.getItem(key));
        post.author = state.email;
        post.authorAvatar = state.avatar;
        localStorage.removeItem(key);
        localStorage.setItem(
          `post/${state.email}/${post.id}`,
          JSON.stringify(post)
        );
      }
    }
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
      {/* Edit User name and email */}
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
              <SP.FormControl
                name="avatar"
                type="text"
                value={state.avatar}
                onChange={handleChange}
                placeholder="Your Avatar Image: Put imageUrl here"
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
