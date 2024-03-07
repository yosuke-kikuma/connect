const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//投稿の作成
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const post = await newPost.save();
    return res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//投稿の更新
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json("あなたは編集に成功しました");
    } else {
      return res.status(403).json("あなたは他の人の編集ができません");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//投稿の削除
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("あなたは削除に成功しました");
    } else {
      return res.status(403).json("あなたは他の人の削除ができません");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//特定の投稿を取得
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//特定の投稿にいいねを押す
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      res.status(200).json("投稿にいいねを押しました");
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });
      res.status(200).json("投稿のいいねを外しました");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//プロフィールの投稿の取得
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// router.get("/profile/:username", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.params.username });
//     if (!user) res.status(404).json("ユーザーが見つかりません");

//     const posts = await Post.find({ userId: user._id });
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//タイムラインの投稿の取得
router.get("/timeline/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    return res.status(500).json(err);
  }
});
// router.get("/timeline/:userId", async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.params.userId);
//     if (!currentUser) res.status(404).json("ユーザーが見つかりません");

//     const userPosts = await Post.find({ userId: currentUser._id });
//     const friendPosts = await Promise.all(
//       currentUser.followings.map((friendId) => {
//         return Post.find({ userId: friendId });
//       })
//     );

//     res.status(200).json(userPosts.concat(...friendPosts));
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
