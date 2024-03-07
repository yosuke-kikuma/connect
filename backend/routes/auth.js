const router = require("express").Router();
const User = require("../models/User");
//ユーザー登録
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//ログイン
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("ユーザーが見つかりません");
    const validPassword = req.body.password === user.password;
    if (!validPassword)
      return res.status(404).json("パスワードが間違っています");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
