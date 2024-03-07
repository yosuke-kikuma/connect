import React from "react";
import styles from "@/styles/rightbar.module.css";

export default function Online({ user }) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;
  return (
    <li className={styles.friend}>
      <div className={styles.friendImgContainer}>
        <img
          className={styles.friendImg}
          src={PUBLIC_FOLDER + user.profilePicture}
          alt="friend"
        />
        <span className={styles.friendOnline}></span>
      </div>
      <span className={styles.friendName}>{user.username}</span>
    </li>
  );
}
