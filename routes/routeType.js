/**
 * External dependencies
 */
const express = require("express");
/**
 * Internal dependencies
 */
const Type = require("../model/Type");
/**
 * Initialization dependencies
 */
const router = express.Router();

//-----------------------------------------------------------------------------

// CREATE
router.post("/create", async (req, res) => {
  const { name, desc } = req.body;
  const value = await Type.createType(name, desc);
  res.json(value);
});

// READ: GET_LIST
router.get("/list", async (req, res) => {
  const value = await Type.getList();
  res.json(value);
});

// READ: GET_BY_ID
router.get("/:typeId", async (req, res) => {
  const typeId = req.params.typeId;
  const value = await Type.getById(typeId);
  res.json(value);
});

// UPDATE
router.put("/:typeId", async (req, res) => {
  const typeId = req.params.typeId;
  const data = req.body;
  const value = await Type.updateType(typeId, data);
  res.json(value);
});

// DELETE
router.delete("/:typeId", async (req, res) => {
  const typeId = req.params.typeId;
  const value = await Type.deleteType(typeId);
  res.json(value);
});

module.exports = router;
