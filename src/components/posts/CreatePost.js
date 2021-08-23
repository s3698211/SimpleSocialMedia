import React, { useState } from "react";
import { StyledCreatePost as SCP } from "./CreatePostStyling";
import moment from "moment";
import { HiOutlinePhotograph } from "react-icons/hi";

export const CreatePost = (props) => {
  const currentUser =
    localStorage.getItem("currentUser") !== null
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null;
  const [post, setPost] = useState({
    id: "",
    body: "",
    imgUrl: "",
    createdAt: moment().format("MMM Do YYYY"),
    author: currentUser !== null ? currentUser.email : "",
    authorAvatar: currentUser !== null ? currentUser.avatar : "",
  });
  const handleChange = (e) => {
    setPost((post) => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  };

  const clearInput = () => {
    setPost({
      id: "",
      body: "",
      imgUrl: "",
      createdAt: moment().format("MMM Do YYYY"),
      author: currentUser.email,
      authorAvatar: currentUser.avatar,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    post.id = (parseInt(currentUser.post) + 1).toString();
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
    await localStorage.setItem("currentUser", JSON.stringify(currentUser));

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
                value={post.body}
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
                        style={{ marginRight: "5px", marginTop: "15px" }}
                      />
                    </SCP.Form.Label>{" "}
                    <SCP.FormControl
                      style={{ height: "35px" }}
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
