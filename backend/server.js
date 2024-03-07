const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const uploadRouter = require("./routes/upload");
const PORT = 5000;
const mongoose = require("mongoose");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/upload", uploadRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("データベースに接続しました");
  })
  .catch((error) => console.log(error));
