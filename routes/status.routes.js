const {
  addstatus,
  getAllstatuss,
  updatestatusById,
  getstatusById,
  deleteById,
} = require("../controllers/status.controller");

const router = require("express").Router();

router.post("/", addstatus);
router.get("/", getAllstatuss);
router.put("/:id", updatestatusById);
router.get("/:id", getstatusById);
router.delete("/:id", deleteById);

module.exports = router;
