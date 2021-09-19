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

class BrandClass {
  static async createBrand(name, desc) {
    try {
      const newBrand = await this.create({
        name,
        desc,
        createdAt: Date.now(),
      });
      const result = await newBrand.save();
      return new Response(true, result, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async getList() {
    try {
      const brands = await this.find({});
      return new Response(true, brands, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async getById(id) {
    try {
      const brand = await this.findOne({ _id: new ObjectId(id) });
      if (!brand) new Response(false, null, "Brand does not exist", 200);

      return new Response(true, brand, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async updateBrand(id, data) {
    const option = { new: true };
    try {
      const brand = await this.findByIdAndUpdate(
        { _id: new ObjectId(id) },
        data,
        option
      );
      if (!brand) return new Response(false, null, "Brand does not exist", 200);

      return new Response(true, brand, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async deleteBrand(id) {
    try {
      const brand = await this.findByIdAndDelete({
        _id: new ObjectId(id),
      });
      if (!brand) return new Response(false, null, "Brand does not exist", 200);

      return new Response(true, brand, "Brand has been deleted", 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }
}

mongoSchema.loadClass(BrandClass);

const Brand = mongoose.model("Brands", mongoSchema);

module.exports = Brand;
