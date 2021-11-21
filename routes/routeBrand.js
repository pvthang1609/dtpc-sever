/**
 * External dependencies
 */
const express = require("express");
/**
 * Internal dependencies
 */
const Brand = require("../model/Brand");
/**
 * Initialization dependencies
 */
const router = express.Router();

//-----------------------------------------------------------------------------

// CREATE
router.post("/", async (req, res) => {
  const { name, desc } = req.body;
  const value = await Brand.createBrand(name, desc);
  res.json(value);
});

// READ: GET_LIST
router.get("/", async (req, res) => {
  const value = await Brand.getList();
  res.json(value);
});

// READ: GET_BY_ID
router.get("/:brandId", async (req, res) => {
  const brandId = req.params.brandId;
  const value = await Brand.getById(brandId);
  res.json(value);
});

// UPDATE
router.put("/:brandId", async (req, res) => {
  const brandId = req.params.brandId;
  const data = req.body;
  const value = await Product.updateBrand(brandId, data);
  res.json(value);
});

// DELETE
router.delete("/:brandId", async (req, res) => {
  const brandId = req.params.brandId;
  const value = await Product.deleteBrand(brandId);
  res.json(value);
});

module.exports = router;
