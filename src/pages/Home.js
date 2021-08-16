import React, { useState, useEffect } from "react";
import { CreatePost } from "../components/posts/CreatePost";
import Post from "../components/posts/Post";

export const Home = () => {
  let posts = [];
  const [reRender, setReRender] = useState(false);
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).includes("post")) {
      let key = localStorage.key(i);
      posts.push(JSON.parse(localStorage.getItem(key)));
    }
  }
  posts.map((post) => console.log(post.author));
  const handleReRender = () => {
    setReRender(!reRender);
  };
  useEffect(() => {}, [reRender]);
  return (
    <div>
      {localStorage.getItem("currentUser") !== "" ? (
        <CreatePost handleReRender={handleReRender} />
      ) : (
        ""
      )}
      <center>
        {posts ? posts.map((post) => <Post post={post} />) : "no post"}
      </center>

      <center></center>
    </div>
  );
};
