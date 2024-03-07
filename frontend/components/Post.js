import React from "react";
import styles from "@/styles/post.module.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import Link from "next/link";
import { AuthContext } from "@/src/state/AuthContext";
import { useContext } from "react";

export default function Post({ post }) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  const [like, setLike] = useState(post.likes.length);
  const [isLike, setIsLike] = useState(false);

  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users?userId=${post.userId}`
        );
        // console.log(response);
        setUser(response.data);
      } catch (error) {
        console.error("ユーザーの取得に失敗しました", error);
      }
    };
    fetchUser();
  }, [post.userId]);

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {
      console.error(error);
    }
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.postTop}>
        <div className={styles.postTopLeft}>
          <Link href={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PUBLIC_FOLDER + user.profilePicture
                  : PUBLIC_FOLDER + "/person/noAvatar.png"
              }
              alt=""
              className={styles.profileImg}
            />
            <span className={styles.userName}>{user.username}</span>
          </Link>
          <span className={styles.postDate}>{format(post.createdAt)}</span>
        </div>
        <div className={styles.postTopRight}></div>
        <MoreVert className={styles.moreVert} />
      </div>
      <div className={styles.postCenter}>
        <span className={styles.postText}>{post.desc}</span>
        <img src={PUBLIC_FOLDER + post.img} alt="" className={styles.postImg} />
      </div>
      <div className={styles.postBottom}>
        <div className={styles.postBottomLeft}>
          <img
            src={PUBLIC_FOLDER + "/heart.png"}
            alt=""
            className={styles.likeIcon}
            onClick={() => handleLike()}
          />
          <span className={styles.postLikeCounter}>
            {like}人がいいねしました
          </span>
        </div>
        <div className={styles.postBottomRight}>
          <span className={styles.postCommentText}>{post.comment}コメント</span>
        </div>
      </div>
    </div>
  );
}
