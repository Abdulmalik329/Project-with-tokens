const {
  addOperation,
  getAllOperations,
  getOperationById,
  updateOperationById,
  deleteById,
} = require("../controllers/operation.controller");

const router = require("express").Router();

router.post("/", addOperation);
router.get("/", getAllOperations);
router.put("/:id", updateOperationById);
router.get("/:id", getOperationById);
router.delete("/:id", deleteById);

module.exports = router;
