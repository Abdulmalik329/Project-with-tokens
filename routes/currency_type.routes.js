const {
  addType,
  getAlltypes,
  updatetypeById,
  gettypeById,
  deleteById,
} = require("../controllers/currency_type.controller");

const router = require("express").Router();

router.post("/", addType);
router.get("/", getAlltypes);
router.put("/:id", updatetypeById);
router.get("/:id", gettypeById);
router.delete("/:id", deleteById);

module.exports = router;
