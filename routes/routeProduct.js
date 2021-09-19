/**
 * External dependencies
 */
const express = require("express");
/**
 * Internal dependencies
 */
const Product = require("../model/Product");
const Response = require("../utils/response");
const authenticateToken = require("../_middleware/authenticateToken");
/**
 * Initialization dependencies
 */
const router = express.Router();

//-----------------------------------------------------------------------------

// CREATE
router.post("/create", authenticateToken, async (req, res) => {
  const { name, type, brand, price } = req.body;
  if (!req.isAdmin)
    return res.json(new Response(false, null, "Unauthorized.", 403));
  const value = await Product.createProduct(name, type, brand, price);
  res.json(value);
});

// READ: GET_LIST
router.get("/list", async (req, res) => {
  const value = await Product.getList();
  res.json(value);
});

// READ: GET_BY_ID
router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  const value = await Product.getById(productId);
  res.json(value);
});

// UPDATE
router.put("/:productId", async (req, res) => {
  const productId = req.params.productId;
  const data = req.body;
  const value = await Product.updateProduct(productId, data);
  res.json(value);
});

// DELETE
router.delete("/:productId", async (req, res) => {
  const productId = req.params.productId;
  const value = await Product.deleteProduct(productId);
  res.json(value);
});

module.exports = router;
