const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  console.log("req", req.cookies);
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res
      .status(401)
      .send({ message: "Unauthorized user, no token provided" });
    // return res.redirect("/auth");
  }
  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = {
      userId: payload.userId,
      userName: payload.userName,
    };
    next();
  } catch (error) {
    next();
    return;
  }
};

module.exports = auth;
