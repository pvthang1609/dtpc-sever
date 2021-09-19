const mongoose = require("mongoose");
const Response = require("../utils/response");
var ObjectId = require("mongoose").Types.ObjectId;

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: "Types",
    required: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brands",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

class ProductClass {
  static async createProduct(name, type, brand, price) {
    try {
      const newProduct = await this.create({
        name,
        type,
        brand,
        price,
        createdAt: Date.now(),
      });
      const result = await newProduct.save();
      return new Response(true, result, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async getList() {
    try {
      const products = await this.find({})
        .populate({ path: "type", select: "name" })
        .populate({ path: "brand", select: "name" });
      return new Response(true, products, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async getById(id) {
    try {
      const product = await this.findOne({ _id: new ObjectId(id) })
        .populate({ path: "type", select: "name" })
        .populate({ path: "brand", select: "name" });
      if (!product) new Response(false, null, "Product does not exist", 200);

      return new Response(true, product, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async updateProduct(id, data) {
    const option = { new: true };
    try {
      const product = await this.findByIdAndUpdate(
        { _id: new ObjectId(id) },
        data,
        option
      );
      if (!product)
        return new Response(false, null, "Product does not exist", 200);

      return new Response(true, product, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async deleteProduct(id) {
    try {
      const product = await this.findByIdAndDelete({
        _id: new ObjectId(id),
      });
      if (!product)
        return new Response(false, null, "Product does not exist", 200);

      return new Response(true, product, "Product has been deleted", 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }
}

mongoSchema.loadClass(ProductClass);

const Product = mongoose.model("Products", mongoSchema);

module.exports = Product;
