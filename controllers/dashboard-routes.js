const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"]
        }
      },
      {
        model: User,
        attributes: ["username"]
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render("dashboard-home", {
        posts,
        loggedIn: true,
        layout: "dashboard"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {layout: "dashboard"});
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"]
        }
      },
      {
        model: User,
        attributes: ["username"]
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render("edit-post", {
        post,
        loggedIn: true,
        layout: "dashboard"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;