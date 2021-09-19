require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Response = require("../utils/response");

const authenticateToken = (req, res, next) => {
  // token format is "Bearer <accessToken>", must be separate accessToken
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decode) => {
      if (err) return res.json(new Response(false, null, err.message, 401));
      try {
        const user = await User.findOne({ _id: decode._id });
        if (!user)
          return res.json(
            new Response(false, null, "User does not exist", 401)
          );

        req.isAdmin = user.isAdmin;
        console.log(user);
        next();
      } catch (error) {
        return res.json(new Response(false, null, error.message, 401));
      }
    }
  );
};

module.exports = authenticateToken;
