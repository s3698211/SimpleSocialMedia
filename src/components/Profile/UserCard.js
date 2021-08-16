import React, { useState } from "react";
import moment from "moment";
import { useHistory } from "react-router";
import { Card, Button, Modal } from "react-bootstrap";
import { defaultAvatar } from "../../Helper";
const UserCard = (props) => {
  const { user, handleShowEditProfile } = props;
  const date = Date.parse(user.join);
  const history = useHistory();
  const newDate = moment(date, "DD-MM-YYYY");
  const [show, setShow] = useState(false);
  const handeDelete = () => {
    localStorage.removeItem(`user/${user.email}`);
    localStorage.setItem("currentUser", "");
    alert("Deleted user.");
    setShow(false);
    history.push("/home");
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={defaultAvatar} />
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
