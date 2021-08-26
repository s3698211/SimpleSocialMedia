import React from "react";
import { Image } from "react-bootstrap";
import { defaultAvatar } from "../../Helper";
import { StyledComment as SC } from "./CommentStyling";
export const Comment = ({ comment }) => {
  return (
    <SC.Container>
      <SC.OwnerImage
        roundedCircle
        src={
          comment.owerNerAvatar !== "" ? comment.owerNerAvatar : defaultAvatar
        }
      />
      <SC.Comment>
        {comment.owner}: <SC.Body>{comment.body}</SC.Body>
      </SC.Comment>
    </SC.Container>
  );
};
