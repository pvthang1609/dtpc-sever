const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Response = require("../utils/response");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const { Schema } = mongoose;
const SALT_ROUNDS = 10;

const mongoSchema = new Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

class UserClass {
  static async register(name, email, password) {
    try {
      const user = await this.findOne({ email });
      if (user) return new Response(false, null, "Email already exists", 200);
      const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const newUser = await this.create({
        name,
        email,
        password: encryptedPassword,
        createdAt: Date.now(),
      });
      const result = await newUser.save();
      return new Response(true, result, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async login(email, password) {
    try {
      // Check email
      const user = await this.findOne({ email });
      if (!user) return new Response(false, null, "Email does not exist", 200);
      // Check password
      const result = await bcrypt.compare(password, user.password);
      if (!result) return new Response(false, null, "Incorrect password", 200);
      // Pass
      const accessToken = await generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      const dataRes = {
        name: user.name,
        isAdmin: user.isAdmin,
        accessToken,
        refreshToken,
      };
      return new Response(true, dataRes, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }
}

mongoSchema.loadClass(UserClass);

const User = mongoose.model("Users", mongoSchema);

module.exports = User;
