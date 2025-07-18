const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "유효한 이메일 형식이 아닙니다.",
    "string.empty": "이메일은 필수 입력 항목입니다.",
  }),
  password: Joi.string()
    .min(8)
    .max(20)
    .required()
    .pattern(/[a-zA-Z]/, "영문자")
    .pattern(/\d/, "숫자")
    .pattern(/[^a-zA-Z0-9]/, "특수문자")
    .messages({
      "string.min": "비밀번호는 최소 8자리 이상이어야합니다.",
      "string.max": "비밀번호는 최대 20자까지 허용됩니다.",
      "string.pattern.name": "{{#name}}가 포함되어야합니다.",
      "string.empty": "비밀번호는 필수 입력 항목입니다.",
    }),
  name: Joi.string().min(2).max(10).required().messages({
    "string.min": "이름은 최소 2자리 이상이어야합니다.",
    "string.max": "이름은 최대 10자리까지입니다.",
    "string.empty": "이름은 필수 입력 항목입니다.",
  }),
});

module.exports = { registerSchema };
