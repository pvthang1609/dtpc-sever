/**
 * External dependencies
 */
const express = require("express");
const jwt = require("jsonwebtoken");
/**
 * Internal dependencies
 */
const User = require("../model/User");
const Response = require("../utils/response");
const { generateAccessToken } = require("../utils/token");
/**
 * Initialization dependencies
 */
const router = express.Router();

//-----------------------------------------------------------------------------

// Server save refreshTokens
const refreshTokens = [];

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const value = await User.register(name, email, password);
  res.json(value);
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const value = await User.login(email, password);
  refreshTokens.push(value.data.refreshToken);
  res.json(value);
});

// LOGOUT
router.post("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter(
    (refreshToken) => refreshToken !== req.body.token
  );

  res.json(new Response(true, null, "Logout success.", 401));
});

// GET_TOKEN
router.post("/get-token", async (req, res) => {
  // 1, Has request body include refreshToken?
  const refreshToken = req.body.token;
  if (!refreshToken)
    return res.json(
      new Response(false, null, "RefreshToken does not exist", 401)
    );
  // 2, Has refreshTokens in server include refreshToken in request body?
  if (!refreshTokens.includes(refreshToken)) {
    return res.json(new Response(false, null, "Invalid refreshToken", 403));
  }

  // 3, Has refreshToken expired ?
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.json(new Response(false, null, err.message, 403));

      const accessToken = await generateAccessToken({ ...decoded });
      return res.json(
        new Response(true, { accessToken: accessToken }, null, 200)
      );
    }
  );
});

module.exports = router;
