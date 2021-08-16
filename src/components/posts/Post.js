import React from "react";
import { StyledPosts as SP } from "./PostStyling";
const Post = (props) => {
  const { post } = props;
  console.log(post);
  return (
    <SP.CardContainer>
      <SP.Header>{post.author}</SP.Header>
      <SP.CardContainer.Body>
        {post.body}
        <br />
        {post.imgUrl !== "" ? <SP.Image src={post.imgUrl} /> : ""}
      </SP.CardContainer.Body>
      <SP.CardContainer.Footer>Comment will go here</SP.CardContainer.Footer>
    </SP.CardContainer>
  );
};

export default Post;
