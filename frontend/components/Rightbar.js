import React from "react";
import styles from "@/styles/rightbar.module.css";
import Online from "./Online";
import { Users } from "@/src/dummyData";

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;
  const HomeRightbar = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.eventContainer}>
          <img className={styles.eventImg} src="/assets/star.png" alt="event" />
          <span className={styles.eventText}>
            <b>フォロワー限定イベント開催中</b>
          </span>
        </div>
        <img src="/assets/event.jpeg" alt="ads" className={styles.ads} />
        <h4 className={styles.title}>オンラインの友達</h4>
        <ul className={styles.friendList}>
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
        <p className={styles.promotionTitle}>プロモーション広告</p>
        <img
          className={styles.promotionImg}
          src="/assets/promotion/promotion1.jpeg"
          alt="ads"
        />
        <p className={styles.promotionName}>ショッピング</p>
        <img
          className={styles.promotionImg}
          src="/assets/promotion/promotion2.jpeg"
          alt="ads"
        />
        <p className={styles.promotionName}>カーショップ</p>
        <img
          className={styles.promotionImg}
          src="/assets/promotion/promotion3.jpeg"
          alt="ads"
        />
        <p className={styles.promotionName}>●●会社</p>
      </div>
    );
  };

  const ProfileRightbar = () => {
    return (
      <div>
        <h4 className={styles.rightbarTitle}>ユーザー情報</h4>
        <div className={styles.rightbarInfo}>
          <div className={styles.rightbarInfoItem}>
            <span className={styles.rightbarInfoKey}>都道府県:</span>
            <span className={styles.rightbarInfokey}>東京都</span>
          </div>
          <h4 className={styles.rightbarTitle}>あなたの友達</h4>
          <div className={styles.rightbarFollowings}>
            <div className={styles.rightbarFollowing}>
              <img
                className={styles.rightbarFollowingImg}
                src={PUBLIC_FOLDER + "/person/1.jpeg"}
                alt="friend"
              />
              <span className={styles.rightbarFollowingName}>友達2</span>
            </div>
            <div className={styles.rightbarFollowing}>
              <img
                className={styles.rightbarFollowingImg}
                src={PUBLIC_FOLDER + "/person/2.jpeg"}
                alt="friend"
              />
              <span className={styles.rightbarFollowingName}>友達3</span>
            </div>
            <div className={styles.rightbarFollowing}>
              <img
                className={styles.rightbarFollowingImg}
                src={PUBLIC_FOLDER + "/person/3.jpeg"}
                alt="friend"
              />
              <span className={styles.rightbarFollowingName}>友達4</span>
            </div>
            <div className={styles.rightbarFollowing}>
              <img
                className={styles.rightbarFollowingImg}
                src={PUBLIC_FOLDER + "/person/4.jpeg"}
                alt="friend"
              />
              <span className={styles.rightbarFollowingName}>友達4</span>
            </div>
            <div className={styles.rightbarFollowing}>
              <img
                className={styles.rightbarFollowingImg}
                src={PUBLIC_FOLDER + "/person/5.jpeg"}
                alt="friend"
              />
              <span className={styles.rightbarFollowingName}>友達4</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{user ? <ProfileRightbar /> : <HomeRightbar />}</>;
}
