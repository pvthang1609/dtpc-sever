const mongoose = require("mongoose");
const Response = require("../utils/response");

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

class TypeClass {
  static async createType(name, desc) {
    try {
      const newType = await this.create({
        name,
        desc,
        createdAt: Date.now(),
      });
      const result = await newType.save();
      return new Response(true, result, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async getList() {
    try {
      const types = await this.find({});
      return new Response(true, types, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async getById(id) {
    try {
      const type = await this.findOne({ _id: new ObjectId(id) });
      if (!type) new Response(false, null, "Type does not exist", 200);

      return new Response(true, type, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async updateType(id, data) {
    const option = { new: true };
    try {
      const type = await this.findByIdAndUpdate(
        { _id: new ObjectId(id) },
        data,
        option
      );
      if (!type) return new Response(false, null, "Type does not exist", 200);

      return new Response(true, type, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async deleteType(id) {
    try {
      const type = await this.findByIdAndDelete({
        _id: new ObjectId(id),
      });
      if (!type) return new Response(false, null, "Type does not exist", 200);

      return new Response(true, type, "Type has been deleted", 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }
}

mongoSchema.loadClass(TypeClass);

const Type = mongoose.model("Types", mongoSchema);

module.exports = Type;
