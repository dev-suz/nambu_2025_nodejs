// 업로드 관련 미들웨어
const multer = require("multer");
const path = require("path");

const uploadDir = `public/uploads`;

const storage = multer.diskStorage({
  destination: `./${uploadDir}`, // 현재 파일이 있는 디렉토리의 하위로 uplodDir을 만들어주세용
  filename: function (req, file, cb) {
    // file.originalname.name : aa   (aa.png -> aa)   + - + unixTimeStamp + 확장자
    // fname : aa-1781234451.png
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(
      null, //err
      fname
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 파일 사이즈 5MB 제한
  },
});

const uploadSingle = upload.single("file");
const uploadMultiple = upload.array("files", 5); // 최대 5개 파일까지 업로드 가능 , Postman 에서 이걸로 인자넘김 files로 넣어주세용~

module.exports = { uploadSingle, uploadMultiple };
