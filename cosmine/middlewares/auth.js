const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: "인가 되지 않은 사용자의 접근입니다." });
  }

  jwt.verify(token, "access_token", (err, user) => {
    if (err) {
      res
        .status(401)
        .json({ message: "비정상 접근 - 유효하지 않은 인가입니다", err });
    }

    req.user = user;

    next();
  });
};

module.exports = {
  authenticate,
};
