import styles from "@/styles/topbar.module.css";
import { Chat, Notifications, Search } from "@mui/icons-material";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/src/state/AuthContext";
import { useRouter } from "next/router";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.topbarLeft}>
        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
          <span className={styles.logo}>Connect</span>
        </Link>
      </div>
      <div className={styles.topbarCenter}>
        <div className={styles.searchbar}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="検索"
          />
        </div>
      </div>
      <div className={styles.topbarRight}>
        <div className={styles.topbarIconItems}>
          <div className={styles.topbarIconItem}>
            <Chat />
            <span className={styles.topbarIconBadge}>1</span>
          </div>
          <div className={styles.topbarIconItem}>
            <Notifications />
            <span className={styles.topbarIconBadge}>2</span>
          </div>
        </div>
        <button
          className={styles.topbarLogoutButton}
          onClick={() => handleLogout()}
        >
          ログアウト
        </button>
        <Link
          href={`/profile/${user.username}`}
          style={{ textDecoration: "none", color: "block" }}
        >
          <img
            src={
              user.profilePicture
                ? PUBLIC_FOLDER + user.profilePicture
                : PUBLIC_FOLDER + "/person/noAvatar.png"
            }
            alt=""
            className={styles.topbarImg}
          />
        </Link>
      </div>
    </div>
  );
}
