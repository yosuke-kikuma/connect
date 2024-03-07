import { React, useContext } from "react";
import styles from "@/styles/timeline.module.css";
import Share from "@/components/Share";
import Post from "@/components/Post";
import axios from "axios";
import { useState, useEffect } from "react";
import { AuthContext } from "@/src/state/AuthContext";

export default function Timeline({ username }) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);
  console.log(username);
  console.log(user._id);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = username
          ? await axios.get(
              `http://localhost:5000/api/posts/profile/${username}`
            )
          : await axios.get(
              `http://localhost:5000/api/posts/timeline/${user._id}`
            );
        console.log(response.data);
        setPosts(
          response.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      } catch (error) {
        console.error("ユーザーの取得に失敗しました", error);
      }
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className={styles.wrapper}>
      <Share />
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
