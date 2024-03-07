import React from "react";
import Styles from "@/styles/share.module.css";
import { Analytics, Face, Gif, Image, NoAccounts } from "@mui/icons-material";
import { AuthContext } from "@/src/state/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";

export default function Share() {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const post = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      post.img = fileName;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {
        console.error(error);
      }
    }

    try {
      axios.post("http://localhost:5000/api/posts", post);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.shareTop}>
        <img
          src={
            user.profilePicture
              ? PUBLIC_FOLDER + user.profilePicture
              : PUBLIC_FOLDER + "/person/noAvatar.png"
          }
          alt=""
          className={Styles.profileImg}
        />
        <input
          type="text"
          placeholder="今、何をしていますか？"
          className={Styles.input}
          ref={desc}
        />
      </div>
      <hr className={Styles.shareHr} />
      <form className={Styles.shareBottom} onSubmit={(e) => handlesubmit(e)}>
        <div className={Styles.options}>
          <label className={Styles.option} htmlFor="file">
            <Image className={Styles.icon} htmlColor="blue" />
            <span className={Styles.optionText}>写真/動画</span>
            <input
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <div className={Styles.option}>
            <Gif className={Styles.icon} htmlColor="pink" />
            <span className={Styles.optionText}>Gif</span>
          </div>
          <div className={Styles.option}>
            <Face className={Styles.icon} htmlColor="green" />
            <span className={Styles.optionText}>気持ち</span>
          </div>
          <div className={Styles.option}>
            <Analytics className={Styles.optionIcon} htmlColor="red" />
            <span className={Styles.optionText}>投票</span>
          </div>
        </div>
        <button className={Styles.button} type="submit">
          投稿
        </button>
      </form>
    </div>
  );
}
