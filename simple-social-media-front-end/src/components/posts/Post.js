import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { StyledPosts as SP } from "./PostStyling";
import { AiOutlineComment, AiFillEdit } from "react-icons/ai";
import { Modal, Button, Image } from "react-bootstrap";

import { EditPost } from "./EditPost";
import { defaultAvatar } from "../../Helper";
import { CreateComment } from "../comment/CreateComment";
import { Comment } from "../comment/Comment";
const Post = ({ post, handleReRender }) => {
  const currentUser =
    localStorage.getItem("currentUser") !== ""
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null;

  const [confirmMessage, setConfirmMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [showComment, setShowComment] = useState(false);
  let comments = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).includes(`comment/${post.id}`)) {
      let comment = JSON.parse(localStorage.getItem(localStorage.key(i)));
      comments.push(comment);
    }
  }

  const toggleHideShowComment = () => {
    setShowComment(!showComment);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = () => {
    if (currentUser) {
      localStorage.removeItem(`post/${post.author}/${post.id}`);
      currentUser.post = parseInt(currentUser.post) - 1;

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem(
        `user/${currentUser.email}`,
        JSON.stringify(currentUser)
      );
      handleClose();
      handleReRender();
    }
  };

  const comment = (
    <>
      <SP.LineBreak></SP.LineBreak>
      <div style={{ position: "relative" }}>
        {currentUser ? (
          <CreateComment
            user={currentUser}
            post={post}
            handleReRender={handleReRender}
          />
        ) : (
          ""
        )}
        {comments.length
          ? comments.map((c) => (
              <>
                <Comment comment={c} />
                <br />
              </>
            ))
          : "comment"}
      </div>
    </>
  );
  return (
    <>
      <SP.CardContainer>
        <SP.Header>
          {currentUser != null && currentUser.email === post.author ? (
            <SP.DropDownButton id="dropdown-basic-button" variant="#f4f6f7">
              <SP.DropDownItem onClick={() => setConfirmMessage(true)}>
                <AiFillDelete /> Delete Post
              </SP.DropDownItem>
              <SP.DropDownItem onClick={handleShow}>
                <AiFillEdit /> Edit Post
              </SP.DropDownItem>
            </SP.DropDownButton>
          ) : (
            ""
          )}{" "}
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "18em",
            }}
          >
            <SP.AuthorImage
              roundedCircle
              src={post.authorAvatar !== "" ? post.authorAvatar : defaultAvatar}
            />

            {post.author}
            <SP.SecondaryText>{post.createdAt}</SP.SecondaryText>
          </span>
        </SP.Header>
        <SP.CardContainer.Body style={{ textAlign: "left" }}>
          {post.body}
          <br />
          {post.imgUrl !== "" ? <SP.Image src={post.imgUrl} /> : ""}
        </SP.CardContainer.Body>
        <SP.CardContainer.Footer>
          <SP.SecondaryButton
            id="onHide"
            onClick={toggleHideShowComment}
            className="comment"
          >
            <AiOutlineComment /> Comment
          </SP.SecondaryButton>
          {showComment ? comment : ""}
        </SP.CardContainer.Footer>
        <EditPost
          sample={post}
          show={show}
          handleClose={handleClose}
          handleReRender={handleReRender}
        />
      </SP.CardContainer>

      {/* ConfirmMessage */}
      <Modal show={confirmMessage}>
        <Modal.Body>Are you sure</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDelete}>Yes</Button>
          <Button onClick={() => setConfirmMessage(false)}>No</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
