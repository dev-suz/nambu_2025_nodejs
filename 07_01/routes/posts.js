const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");

const { uploadSingle, uploadMultiple } = require("../middlewares/upload");

router.post("/", uploadMultiple, postController.createPost);
router.post("/", uploadMultiple, postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostDetail);
// re ?
router.put("/:id", uploadMultiple, postController.upadatePost);
router.delete("/:id", postController.deletePost);

router.post("/:postId/comment", postController.addComment);
router.get("/:postId/comments", postController.getAllComments);
router.put("/:postId/comments/:id", postController.updateComment);
router.delete("/:postId/comments/:id", postController.deleteComment);

module.exports = router;
