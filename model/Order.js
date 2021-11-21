const mongoose = require("mongoose");
const Response = require("../utils/response");
const orderStatus = require("../_helpers/enum/orderStatus");

const { Schema } = mongoose;

const mongoSchema = new Schema({
  customer: {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    shipmentDetails: {
      deliveryAddress: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      consigneeName: {
        type: String,
        required: true,
      },
    },
  },
  order: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  paymentMethods: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  status: {
    type: Number,
    required: true,
    default: orderStatus.draft,
  },
  createBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

class OrderClass {
  static async createOrder(user, data) {
    try {
      const { customer, order, paymentMethods, status, note } = data;
      const newOrder = await this.create({
        customer,
        order,
        paymentMethods,
        note,
        createBy: user,
      });
      const result = await newOrder.save();
      return new Response(true, result, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async getList(query) {
    const { userId, sort, page, limit } = query;
    const userIdFilter = userId ? { createBy: userId } : null;
    const sortFilter = sort ? Sort[sort] : null;
    const skip = (page - 1) * limit;

    try {
      const orders = await this.find({
        ...userIdFilter,
        ...sortFilter,
      })
        // TODO: return only name?
        .skip(skip)
        .limit(limit);
      const total = await Order.count();

      const data = {
        list: orders,
        pagination: {
          page,
          pageSize: limit,
          total,
        },
      };
      return new Response(true, data, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async getById(userId, id) {
    // TODO: unused userId in method findOne
    try {
      const order = await this.findOne({ _id: id });
      if (!order) new Response(false, null, "Order does not exist", 200);

      return new Response(true, order, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async updateOrder(id, data) {
    const option = { new: true };
    try {
      const order = await this.findByIdAndUpdate({ _id: id }, data, option);
      if (!order) return new Response(false, null, "Order does not exist", 200);

      return new Response(true, order, null, 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }

  static async deleteOrder(id) {
    try {
      const product = await this.findByIdAndDelete({
        _id: id,
      });
      if (!product)
        return new Response(false, null, "Order does not exist", 200);

      return new Response(true, product, "Order has been deleted", 200);
    } catch (error) {
      return new Response(false, null, error.message, 503);
    }
  }
}

mongoSchema.loadClass(OrderClass);

const Order = mongoose.model("Orders", mongoSchema);

module.exports = Order;
