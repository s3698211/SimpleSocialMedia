import React, { useState } from "react";
import moment from "moment";
import { useHistory } from "react-router";
import { Card, Button, Modal } from "react-bootstrap";
import { defaultAvatar } from "../../Helper";
import { StyledUserCard as SUC } from "./UserCardStyling";
const UserCard = ({ user, handleShowEditProfile }) => {
  const history = useHistory();

  const [show, setShow] = useState(false);

  const handeDelete = () => {
    localStorage.removeItem(`user/${user.email}`);

    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).includes(`post/${user.email}`)) {
        localStorage.removeItem(localStorage.key(i));
      }
    }
    localStorage.setItem("currentUser", "");
    alert("Deleted user.");
    setShow(false);
    history.push("/home");
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <SUC.ImageProfile
          rounded
          variant="top"
          src={user.avatar !== "" ? user.avatar : defaultAvatar}
        />
        <Card.Body>
          <Card.Title>{user.email}</Card.Title>

          <Card.Text>Name: {user.name}</Card.Text>
          <Card.Text>Join: {user.join}</Card.Text>
          <Button
            style={{ marginRight: "10px" }}
            onClick={handleShowEditProfile}
            variant="primary"
          >
            Edit Profile
          </Button>
          <Button
            onClick={() => {
              setShow(true);
            }}
            variant="danger"
          >
            Delete account
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show}>
        <Modal.Body> Are you sure</Modal.Body>
        <Modal.Footer>
          <Button onClick={handeDelete} variant="danger">
            Yes
          </Button>
          <Button onClick={() => setShow(false)} variant="primary">
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCard;
