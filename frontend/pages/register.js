import React from "react";
import styles from "@/styles/register.module.css";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "@/src/state/AuthContext";
import axios from "axios";
import Link from "next/link";


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  console.log(user);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordConfirmation.current.value) {
      password.current.setCustomValidity("パスワードが一致しません");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      await axios.post("http://localhost:5000/api/auth/register", user);
      router.push("/login");
      console.log(user);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h3 className={styles.lodinLogo}>Conect</h3>
          <span className={styles.loginDesc}>本格的なSNSを体験しよう!</span>
        </div>
        <div className={styles.loginRight}>
          <form className={styles.loginBox} onSubmit={(e) => handleSubmit(e)}>
            <p className={styles.loginTitle}>新規登録はこちら</p>
            <input
              type="text"
              className={styles.loginInput}
              placeholder="ユーザー名"
              required
              ref={username}
            />
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
            <input
              type="password"
              className={styles.loginInput}
              placeholder="確認用パスワード"
              required
              minLength={6}
              ref={passwordConfirmation}
            />
            <button type="submit" className={styles.loginButton}>
              サインアップ
            </button>
            <Link href="/login" style={{ textDecoration: "none", color: "black" }}>
              <button className={styles.loginRegisterButton}>ログインページへ</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
