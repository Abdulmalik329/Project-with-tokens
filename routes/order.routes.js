const {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteById,
} = require("../controllers/order.controller");

const router = require("express").Router();

router.post("/", addOrder);
router.get("/", getAllOrders);
router.put("/:id", updateOrderById);
router.get("/:id", getOrderById);
router.delete("/:id", deleteById);

module.exports = router;
