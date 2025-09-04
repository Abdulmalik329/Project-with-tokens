const express = require("express");
const clientRouter = require("./client.routes");
const currency_type = require("./currency_type.routes");
const statusRouter = require("./status.routes");
const adminRouter = require("./admin.routes");
const orderRouter = require("./order.routes");
const operationRouter = require("./operation.routes");
const authRouter = require("./auth.routes");

const router = express.Router();

router.use("/client", clientRouter);
router.use("/currency_type", currency_type);
router.use("/status", statusRouter);
router.use("/admin", adminRouter);
router.use("/order", orderRouter);
router.use("/operation", operationRouter);
router.use("/auth", authRouter);

module.exports = router;
