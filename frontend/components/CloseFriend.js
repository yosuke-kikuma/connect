import React from "react";
import styles from "@/styles/sidebar.module.css";

export default function CloseFriend({user}) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  return (
    <li className={styles.friend}>
      <img className={styles.friendImg} src={PUBLIC_FOLDER + user.profilePicture} alt="" />
      <span className={styles.friendName}>{user.username}</span>
    </li>
  );
}
