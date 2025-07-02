const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: "not authorized user - access without authorization" });
  }

  jwt.verify(token, "access_token", (err, user) => {
    if (err) {
      res
        .status(401)
        .json({ message: "not autorized - invalid authorization", err });
    }

    req.user = user;

    next();
  });
};

module.exports = {
  authenticate,
};
