const User = require("../models/user");
require("dotenv").config();
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return res.status(409).send({
        message: "User is already registered",
      });
    }
    const user = await User.create({ userName, email, password });

    //!create access token
    const accessToken = user.createAccessToken();

    //!send access token in cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, //!30 days
    });
    const l3iba = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const expire = l3iba.exp;
    res.cookie("expire", expire, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    //!create refresh token
    const refreshToken = user.createRefreshToken();
    //!send refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, //!30 days
    });
    //!send response

    const userPayload = {
      ...user,
      accessToken,
      refreshToken,
    };

    res.status(201).send(userPayload);
  } catch (error) {
    res.status(500).send(error);
  }
};
/*
  !login requirements:
    !get user using the unique email
    !check the password if it is correct
    !create access token and refresh token
    !send them to res.cookie
    !send the response=>{success:true,name:userName}
*/
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please provide email and password",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `The user with ${email} is not found`,
      });
    }
    if (!user.validePassword(password)) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }
    //!create access token
    const accessToken = user.createAccessToken();
    //!send access token in cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, //!30 days
    });
    const l3iba = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const expire = l3iba.exp;
    res.cookie("expire", expire, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    //!create refresh token
    const refreshToken = user.createRefreshToken();
    //!send refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, //!30 days
    });
    //!send response

    const userPayload = {
      ...user,
      accessToken,
      refreshToken,
    };

    res.status(200).send(userPayload);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      errorPoint: "from login controller",
    });
  }
};

const renderAuth = (req, res) => {
  res.render("auth");
};

const renderSignUp = (req, res) => {
  res.render("signup");
};

module.exports = {
  register,
  login,
  renderAuth,
  renderSignUp,
};
