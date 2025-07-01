const bcrypt = require("bcryptjs");

async function validateAndHashPassword(req, res, next) {
  const password = req.body.password;

  if (!password) {
    return res.status(400).json({ message: "비밀번호가 필요합니다." });
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^a-zA-A0-9]/.test(password);

  if (
    password.length < 8 ||
    password.legnth > 20 ||
    !hasLetter ||
    !hasNumber ||
    !hasSpecial
  ) {
    return res.status(400).json({
      message:
        "비밀번호는 8자 ~ 20 자로 영어, 숫자, 특수문자를 하나씩 포함해야합니다.",
    });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(password, salt);

  next();
}

module.exports = {
  validateAndHashPassword,
};
