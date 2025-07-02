const models = require("../models");

const createPost = async (req, res) => {
  //  나중에 확장할때 카테고리별로 받는게 다를 수 있음 - ??
  console.log("---c_post: ", req.body);
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
    // console.log(`${category}, ${authorId}, ${attachments}, ${title}`);
    // console.log(`post payload : ${(category, authorId, attachments, title)}`);
    const post = await models.Post.create(
      { category, authorId, attachments, title },
      { transaction: t }
    );
    // review
    // 카테고리 예외처리?
    console.log(`category(rv) payload : ${(post.id, raiting, title, content)}`);
    if (category === "review") {
      await models.ReviewDetail.create(
        { postId: post.id, raiting, title, content },
        { transaction: t }
      );
    }
    await t.commit();
    res.status(200).json({ message: "ok", data: post });
  } catch (error) {
    await t.rollback();
    console.error("createPost error:", error);
    res.status(500).json({ message: "error", error });
  }

  // file 처리
};

const getAllPosts = async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "ok", data: posts });
};

const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const reviewDetailId = req.params.reviewDetailId;
  const t = await models.sequelize.transaction();
  const post = await models.Post.findByPk(postId, { transaction: t });
  const authorId = post.authorId;

  //   console.log(`##`, post.authorId);
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
        console.log("changing~ contents");
        // category, raiting, title, content
        if (title !== undefined) post.title = title;
        if (attachments !== undefined) post.attachments = attachments;
        if (raiting !== undefined) review.raiting = raiting;
        if (content !== undefined) review.content = content;

        await post.save({ transaction: t });
        await review.save({ transaction: t });
        await t.commit();

        res.status(200).json({ messsage: "updated", data: { post, review } });
      } catch (error) {
        await t.rollback();
        console.error("createPost error:", error);
        return res
          .status(500)
          .json({ message: "error during saving posts..", error });
      }
    } else {
      res.status(404).json({ messsage: "post not found" });
    }
  } else {
    res.status(401).json({ message: "you are not the origianl writer" });
  }
};

//   "/:postId/:reviewDetailId",
const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const reviewDetailedId = req.params.reviewDetailId;
  const t = await models.sequelize.transaction();
  const post = await models.Post.findByPk(postId);
  const authorId = post.authorId;
  //   console.log(`===original author`, authorId);
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
      console.log(error);
      res.status(500).json({ message: "삭제 실패", error });
    }
  } else {
    res.status(401).json({ message: "you are not the origianl writer" });
  }
};

const createComment = async (req, res) => {
  console.log("create comment 타ㅏ고있어요~");
  const postId = req.params.postId;
  const { content } = req.body;
  console.log(`payload : ${postId}, ${content}`);
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: req.user.id,
  });
  res.status(201).json({ message: "ok", data: comment });
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  createComment,
};
