const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");

const { uploadMultiple } = require("../middlewares/upload");
const { authenticate } = require("../middlewares/auth");

// ? /post   (dt)
router.post("/", authenticate, uploadMultiple, postController.createPost);
router.get("/", postController.getAllPosts);
router.patch(
  "/:postId/:reviewDetailId",
  authenticate,
  uploadMultiple,
  postController.updatePost
);
router.delete(
  "/:postId/:reviewDetailId",
  authenticate,
  postController.deletePost
);

router.post("/:postId/comments", authenticate, postController.createComment);
router.get("/:postId/comments", postController.getAllComments);

router.patch(
  "/:postId/comments/:id",
  authenticate,
  postController.updateComment
);
router.delete(
  "/:postId/comments/:id",
  authenticate,
  postController.deleteComment
);

module.exports = router;
