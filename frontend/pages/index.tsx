import Head from "next/head";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import Timeline from "@/components/Timeline";
import Rightbar from "@/components/Rightbar";
import styles from "@/styles/index.module.css";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/src/state/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  console.log(user);

  useEffect(() => {
    if (!user) {
      router.push("/register"); // ユーザーがログインしていなければホームページにリダイレクト
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" />
      </Head>
      <>
        <Topbar />
        <div className={styles.container}>
          <Sidebar />
          <Timeline />
          <Rightbar />
        </div>
      </>
    </>
  );
}
