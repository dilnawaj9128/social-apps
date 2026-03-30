import React, { useState, useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:5000/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const createPost = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`   // 🔥 IMPORTANT
      },
      body: JSON.stringify({ text })
    });

    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <input onChange={e => setText(e.target.value)} />
      <button onClick={createPost}>Post</button>

      {posts.map(p => <p key={p._id}>{p.text}</p>)}
    </div>
  );
}

export default Posts;