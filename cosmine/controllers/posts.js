const models = require("../models");

const createPost = async (req, res) => {
  //  나중에 확장할때 카테고리별로 받는게 다를 수 있음
  const { category, raiting, title, content } = req.body;
  const authorId = req.user?.id;

  if (!authorId) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  const t = await models.sequelize.transaction();

  let filename = req.file ? req.file.filename : null;

  filename = `downloads/${filename}`;

  let attachments = [];
  if (req.file) {
    attachments.push({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } else if (req.files && req.files.length > 0) {
    attachments = req.files.map((file) => ({
      filename: file.filename,
      originalname: Buffer.from(file.originalname, "latin1").toString("utf-8"),
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    }));
  }

  try {
    const post = await models.Post.create(
      { category, authorId, attachments, title },
      { transaction: t }
    );
    // review
    // 카테고리 예외처리?

    if (category === "review") {
      await models.ReviewDetail.create(
        { postId: post.id, raiting, title, content },
        { transaction: t }
      );
    }
    await t.commit();
    res.status(200).json({ message: "게시글(리뷰) 작성완료", data: post });
  } catch (error) {
    await t.rollback();
    // console.error("createPost error:", error);
    res.status(500).json({ message: "게시글(리뷰) 작성중 에러 발생", error });
  }

  // file 처리
};

const getAllPosts = async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "전체 게시글 조회 성공", data: posts });
};

const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const reviewDetailId = req.params.reviewDetailId;
  const t = await models.sequelize.transaction();
  const post = await models.Post.findByPk(postId, { transaction: t });
  const authorId = post.authorId;

  // 일단 지금 review로 한정 ( 카테고리 바꾸면 머리아파질것같은데)
  const review = await models.ReviewDetail.findByPk(reviewDetailId);
  const { raiting, title, content } = req.body;

  // 작성한 사용자가 맞는지 확인
  const access_user = req.user?.id;
  if (authorId === access_user) {
    if (post) {
      let filename = req.file ? req.file.filename : null;
      filename = `downloads/${filename}`;
      let attachments = [];

      if (req.file) {
        attachments.push({
          filename: req.file.filename,
          origianlname: req.file.originalname,
          path: req.file.path,
          size: req.file.size,
          mimetype: req.file.mimetype,
        });
      } else if (req.files && req.files.length > 0) {
        attachments = req.files.map((file) => ({
          filename: file.filename,
          originalname: file.originalname,
          path: file.path,
          size: file.size,
          mimetype: file.mimetype,
        }));
      } else {
        attachments = post.attachments;
      }

      try {
        // category, raiting, title, content
        if (title !== undefined) post.title = title;
        if (attachments !== undefined) post.attachments = attachments;
        if (raiting !== undefined) review.raiting = raiting;
        if (content !== undefined) review.content = content;

        await post.save({ transaction: t });
        await review.save({ transaction: t });
        await t.commit();

        res.status(200).json({
          messsage: "게시글(리뷰) 업데이트 성공",
          data: { post, review },
        });
      } catch (error) {
        await t.rollback();
        console.error("createPost error:", error);
        return res
          .status(500)
          .json({ message: "게시글 저장중에 에러 발생", error });
      }
    } else {
      res.status(404).json({ messsage: "게시글을 찾을 수 없습니다." });
    }
  } else {
    res.status(401).json({ message: "게시글 원작자가 아닙니다. 접근 비허용" });
  }
};

//   "/:postId/:reviewDetailId",
const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const reviewDetailedId = req.params.reviewDetailId;
  const t = await models.sequelize.transaction();
  const post = await models.Post.findByPk(postId);
  const authorId = post.authorId;

  const review = await models.ReviewDetail.findByPk(reviewDetailedId);

  const access_user = req.user?.id;
  if (authorId === access_user) {
    try {
      await models.ReviewDetail.destroy({
        where: { id: reviewDetailedId },
        transaction: t,
      });
      await models.Post.destroy({
        where: { id: postId },
        transaction: t,
      });

      await t.commit();
      res.status(200).json({ message: "삭제 성공" });
    } catch (error) {
      await t.rollback();
      // console.log(error);
      res.status(500).json({ message: "삭제 실패", error });
    }
  } else {
    res.status(401).json({ message: "게시글 원작자가 아닙니다. 접근 비허용" });
  }
};

const createComment = async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  const post = await models.Post.findByPk(postId);

  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }

  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: req.user.id,
  });
  res.status(201).json({ message: "댓글 작성 완료", data: comment });
};

const getAllComments = async (req, res) => {
  const postId = req.params.postId;

  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
  });

  res
    .status(200)
    .json({ message: "게시글에 달린 전체 댓글 조회 성공", data: comments });
};

const updateComment = async (req, res) => {
  const access_user = req.user?.id;

  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  const post = await models.Post.findByPk(postId);
  const authorId = post.authorId;
  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }

  if (authorId === access_user) {
    const comment = await models.Comment.findOne({
      where: { id: commentId, postId: postId },
    });

    if (!comment) {
      return res
        .status(404)
        .json({ message: "수정하고자하는 댓글을 찾을 수 없습니다." });
    }

    if (content) {
      comment.content = content;
      await comment.save();
      res.status(200).json({ message: "댓글 수정 완료", data: comment });
    }
  } else {
    res.status(401).json({ message: "댓글의 원작자가 아닙니다. 접근 비허용" });
  }
};

const deleteComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;

  const post = await models.Post.findByPk(postId);
  const access_user = req.user.id;
  const authorId = post.authorId;
  if (!post || post < 1) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
  if (access_user === authorId) {
    const result = await models.Comment.destroy({
      where: { id: commentId, postId: postId },
    });

    if (result > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "댓글 지우는 과정 중 에러 발생." });
    }
  }
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
};
