const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token;
  // authorization : Bearer eyxxxxx(포스트맨에 Bearer+space+키)
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1]; // eyxxxx~ 가져옴 -
  }
  if (!token) {
    console.log("---- token err");
    return res.status(401).json({ message: "not authorized" });
  }
  // 토큰 검증 veryfy()
  // 두번째 인자 발급받을 때와 같이 해줘야함!
  jwt.verify(token, "access_token", (err, user) => {
    if (err) {
      console.log("---verifying err");
      res.status(401).json({ message: "not authorized", error: err });
    }
    // 다음 핸들러 태울때 authorId 에 값 req.user 줌 --> post 참고
    req.user = user;

    next(); // 다음 미들웨어 혹은 핸들러 함수로 이동.
  });
};

module.exports = {
  authenticate,
};
