require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateAccessToken = async (data) => {
  return jwt.sign(
    { _id: data._id, isAdmin: data.isAdmin },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    }
  );
};

const generateRefreshToken = async (data) => {
  return jwt.sign(
    { _id: data._id, isAdmin: data.isAdmin },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    }
  );
};
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
