const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    }, // payload(페이로드) : 토큰에 담길 유저 정보
    "access_token", // 키 : 토큰 서명키, 이 키를 이용해서 토큰의 유효성 검증
    { expiresIn: "30d" } // 만료일 : 30d  : 30일
  );
};

module.exports = {
  generateAccessToken,
};
