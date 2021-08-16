import React, { useState } from "react";
import { StyledCreatePost as SCP } from "./CreatePostStyling";
import moment from "moment";
import { HiOutlinePhotograph } from "react-icons/hi";

export const CreatePost = (props) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [post, setPost] = useState({
    body: "",
    imgUrl: "",
    createdAt: moment().format("MMM Do YYYY"),
    author: currentUser.email,
  });
  const handleChange = (e) => {
    setPost((post) => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  };

  const clearInput = () => {
    setPost((post) => ({
      ...post,
      body: "",
      imgUrl: "",
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      `post/${currentUser.email}/${parseInt(currentUser.post) + 1}`,
      JSON.stringify(post)
    );
    //increase the number of user's post by one

    currentUser.post = (parseInt(currentUser.post) + 1).toString();
    localStorage.setItem(
      `user/${currentUser.email}`,
      JSON.stringify(currentUser)
    );
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    clearInput();
    props.handleReRender();
  };
  return (
    <center>
      <SCP.CardContainer>
        <center>
          <SCP.Form onSubmit={handleSubmit}>
            <SCP.CardContainer.Body>
              <SCP.FormControl
                required
                className="postBody"
                name="body"
                as="textarea"
                value={post.name}
                onChange={handleChange}
                placeholder="Write something ..."
              />
            </SCP.CardContainer.Body>
            <SCP.CardContainer.Footer>
              <SCP.Row>
                <SCP.Col>
                  <SCP.Row>
                    <SCP.Form.Label>
                      <HiOutlinePhotograph
                        style={{ marginRight: "5px", marginTop: "10px" }}
                      />
                    </SCP.Form.Label>{" "}
                    <SCP.FormControl
                      className="postFooter"
                      name="imgUrl"
                      type="text"
                      value={post.imgUrl}
                      onChange={handleChange}
                      placeholder="put an ImageUrl here."
                    />
                  </SCP.Row>
                </SCP.Col>
                <SCP.Col>
                  <SCP.Button type="submit">Submit</SCP.Button>
                </SCP.Col>
              </SCP.Row>
            </SCP.CardContainer.Footer>
          </SCP.Form>
        </center>
      </SCP.CardContainer>
    </center>
  );
};
