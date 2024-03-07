import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/login.module.css";
import { loginCall } from "@/src/ActionCalls";
import { AuthContext } from "@/src/state/AuthContext";
import Link from "next/link";

export default function login() {
  const email = useRef();
  const password = useRef();
  const router = useRouter();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  console.log(user);

  useEffect(() => {
    if (user) {
      router.push("/"); // ユーザーがログインしていればホームページにリダイレクト
    }
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h3 className={styles.lodinLogo}>Connect</h3>
          <span className={styles.loginDesc}>本格的なSNSを体験しよう!</span>
        </div>
        <form className={styles.loginRight} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.loginBox}>
            <p className={styles.loginTitle}>ログインはこちら</p>
            <input
              type="email"
              className={styles.loginInput}
              placeholder="Eメール"
              required
              ref={email}
            />
            <input
              type="password"
              className={styles.loginInput}
              placeholder="パスワード"
              required
              minLength={6}
              ref={password}
            />
            <button className={styles.loginButton}>ログイン</button>
            <span className={styles.loginForgot}>パスワードを忘れた方</span>
            <Link href="/register" style={{ textDecoration: "none", color: "black" }}>
            <button type="submit" className={styles.loginRegisterButton}>
              アカウント作成
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
