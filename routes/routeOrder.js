/**
 * External dependencies
 */
const express = require("express");
/**
 * Internal dependencies
 */
const Order = require("../model/Order");
const Response = require("../utils/response");
const authenticateToken = require("../_middleware/authenticateToken");
/**
 * Initialization dependencies
 */
const router = express.Router();

//-----------------------------------------------------------------------------

// CREATE
router.post("/", authenticateToken, async (req, res) => {
  const value = await Order.createOrder(req.userId, req.body);
  res.json(value);
});

// READ: GET_LIST
router.get("/", authenticateToken, async (req, res) => {
  const query = req.query;
  query.userId = req.userId;
  const value = await Order.getList(query);
  res.json(value);
});

// READ: GET_BY_ID
router.get("/:orderId", authenticateToken, async (req, res) => {
  const orderId = req.params.orderId;
  const value = await Order.getById(req.userId, orderId);
  res.json(value);
});

// UPDATE
router.put("/:orderId", authenticateToken, async (req, res) => {
  const orderId = req.params.orderId;
  const data = req.body;
  const value = await Order.updateOrder(orderId, data);
  res.json(value);
});

// DELETE
router.delete("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const value = await Order.deleteOrder(orderId);
  res.json(value);
});

module.exports = router;
