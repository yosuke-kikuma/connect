import React from "react";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import Timeline from "@/components/Timeline";
import Rightbar from "@/components/Rightbar";
import styles from "@/styles/profile.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function profile() {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const router = useRouter();
  const username = router.query.username;
  console.log(username);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users?username=${username}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("ユーザーの取得に失敗しました", error);
      }
    };
    fetchUser();
  }, [username]);

  console.log(user);

  return (
    <>
      <Topbar />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.profileRight}>
          <div className={styles.profileRightTop}>
            <div className={styles.profileCover}>
              <img
                src={user.coverPicture || PUBLIC_FOLDER + "/post/3.jpeg"}
                alt=""
                className={styles.profileCoverImg}
              />
              <img
                className={styles.profileUserImg}
                src={
                  user.profilePicture || PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className={styles.profileInfo}>
              <h4 className={styles.profileInfoName}>{user.username}</h4>
              <span className={styles.profileInfoDesc}>{user.desc}</span>
            </div>
          </div>
          <div className={styles.profileRightBottom}>
            <Timeline username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
