import React from "react";
import styles from "@/styles/sidebar.module.css";
import {
  Bookmark,
  Home,
  MessageRounded,
  Notifications,
  Person,
  Search,
  Settings,
} from "@mui/icons-material";
import CloseFriend from "./CloseFriend";
import { Users } from "@/src/dummyData";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/src/state/AuthContext";


export default function Sidebar() {
  const { user } = useContext(AuthContext);

  console.log(user);
  
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Home className={styles.icon} />
          <Link href="/" style={{ textDecoration: "none", color: "black" }}>
            <span className={styles.text}>ホーム</span>
          </Link>
        </li>
        <li className={styles.item}>
          <Search className={styles.icon} />
          <span className={styles.text}>検索</span>
        </li>
        <li className={styles.item}>
          <Notifications className={styles.icon} />
          <span className={styles.text}>通知</span>
        </li>
        <li className={styles.item}>
          <MessageRounded className={styles.icon} />
          <span className={styles.text}>メッセージ</span>
        </li>
        <li className={styles.item}>
          <Bookmark className={styles.icon} />
          <span className={styles.text}>ブックマーク</span>
        </li>
        <li className={styles.item}>
          <Person className={styles.icon} />
          <Link
          href={`/profile/${user.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <span className={styles.text}>プロフィール</span>
          </Link>
        </li>
        <li className={styles.item}>
          <Settings className={styles.icon} />
          <span className={styles.text}>設定</span>
        </li>
      </ul>
      <hr className={styles.sidebarHr} />

      <ul className={styles.friendList}>
        {Users.map((user) => (
          <CloseFriend key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
