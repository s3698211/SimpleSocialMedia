import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { StyledComment as SC } from "./CommentStyling";
export const CreateComment = ({ user, post, handleReRender }) => {
  const [comment, setComment] = useState({
    id: `comment/${post.id}/${user.email}`,
    owner: user.email,
    owerNerAvatar: user.avatar,
    body: "",
  });

  const handleChange = (e) => {
    setComment((comment) => ({
      ...comment,
      [e.target.name]: e.target.value,
    }));
  };
  const handleKeyPressed = (e) => {
    if (e.charCode == 13) {
      handleSubmit();
    }
  };

  const clearInput = () => {
    setComment({
      id: `comment/${post.id}/${user.email}`,
      owner: user.email,
      body: "",
    });
  };

  const handleSubmit = () => {
    if (!localStorage.getItem("commentNumber")) {
      localStorage.setItem("commentNumber", JSON.stringify(0));
    } else {
      let commentNumber = JSON.parse(localStorage.getItem("commentNumber"));
      localStorage.setItem("commentNumber", JSON.stringify(commentNumber + 1));
    }
    localStorage.setItem(
      `${comment.id}/${localStorage.getItem("commentNumber")}`,
      JSON.stringify(comment)
    );
    clearInput();
    handleReRender();
  };
  const addComment = () => {};
  return (
    <div>
      <Form>
        <SC.FormControl
          type="submit"
          required
          name="body"
          value={comment.body}
          as="textarea"
          onChange={handleChange}
          onKeyPress={handleKeyPressed}
          placeholder="Add comments"
        />
      </Form>
    </div>
  );
};
