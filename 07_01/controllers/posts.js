const models = require("../models");

const createPost = async (req, res) => {
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null; // filename : aa-1234568.png
  console.log(`filename : ${filename}`);

  filename = `/downloads/${filename}`; // http://localhost:3000/downloads/aa-1234568.png

  // 원래는 JWT 토큰에서 사용자 ID 를 받아와서 넣어줘야하지만 아직 배우지 않아서
  // 사용자를 생성하고 그다음에 게시글을 넣겠습니다!
  // let user = await models.User.findOne({
  //   where: { email: "example@example.com" },
  // });
  // if (!user) {
  //   user = await models.User.create({
  //     name: "함선우",
  //     email: "example@example.com",
  //     password: "12345678",
  //   });
  // }

  let attachments = [];
  if (req.file) {
    // singleFile 처리
    attachments.push({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } else if (req.files && req.files.length > 0) {
    // multiple file 처리
    attachments = req.files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    }));
  }

  // console.log(JSON.stringify(user));
  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: req.user.id,
    // fileName: filename,
    attachments: attachments,
  });

  res.status(201).json({ message: "ok", data: post });
};

const getAllPosts = async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "ok", data: posts });
};

const getPostDetail = async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (post) {
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "post not found" });
  }
};

// re -- ?
const upadatePost = async (req, res) => {
  const id = req.params.id;
  console.log(`===req : `, req);
  const { title, content } = req.body;

  const post = await models.Post.findByPk(id);

  if (post) {
    post.title = title;
    post.content = content;

    // 기존 파일과 갯수가 같고 동일하면 그대로
    // 특별히 올리는 파일이 없으면 그대로 ?

    let attachments = [];
    if (req.file) {
      // singleFile 처리
      attachments.push({
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });
      // console.log(`req.file : `, req.file);
    } else if (req.files && req.files.length > 0) {
      // multiple file 처리
      attachments = req.files.map((file) => ({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
      }));
      // console.log(`req.files : `, req.files);
    } else {
      attachments = post.attachments;
      // console.log(attachments);
    }

    // await post.save();
    // console.log(`attachments === `, attachments);

    post.set({ attachments });
    await post.save();
    // res.status(200).json({ message: "ok", data: post });
    res.status(200).json({ message: "ok", data: post.get({ plain: true }) });
  } else {
    res.status(404).json({ message: "post not found " });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const result = await models.Post.destroy({
    where: { id: id },
  });

  if (result > 0) {
    res.status(200).json({ message: "ok" });
  } else {
    res.status(404).json({ messsage: "post not found" });
  }
};

const addComment = async (req, res) => {
  // let user = await models.User.findOne({
  //   where: { email: "b@example.com" },
  // });
  // if (!user) {
  //   user = await models.User.create({
  //     name: "뉴진스",
  //     email: "b@example.com",
  //     password: "12345678",
  //   });
  // }

  const postId = req.params.postId;
  const { content } = req.body;

  const post = await models.Post.findByPk(postId);

  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // console.log("decoded user from token", req.user);

  // if (!req.user || !req.user.id) {
  //   return res.status(401).json({ message: "invalid user info" });
  // }
  //

  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: req.user.id,
  });
  res.status(201).json({ message: "ok", data: comment });
};

const getAllComments = async (req, res) => {
  const postId = req.params.postId;
  // 포스트 있나 확인
  // Re 추가
  // 전체 조회
  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
    order: [
      ["createdAt", "DESC"],
      ["content", "DESC"],
    ],
  });
  res.status(200).json({ message: "ok", data: comments });
};

const updateComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  //1. 게시글 유무 확인
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  //2. 댓글 가지고 오기
  const comment = await models.Comment.findOne({
    where: { id: commentId, postId: postId },
  });
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }
  //3. 댓글 수정 및 저장
  if (content) {
    comment.content = content;
    await comment.save();
    res.status(200).json({ message: "ok", data: comment });
  }
};

const deleteComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;

  //1. 게시물 존재 확인
  const post = await models.Post.findByPk(postId);
  console.log(post);
  if (!post || post < 1) {
    return res.status(404).json({ message: "post not found" });
  }

  const result = await models.Comment.destroy({
    where: { id: commentId, postId: postId },
  });

  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "comment not found" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostDetail,
  upadatePost,
  deletePost,
  addComment,
  getAllComments,
  updateComment,
  deleteComment,
};
