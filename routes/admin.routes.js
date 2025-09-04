const {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteById,
} = require("../controllers/admin.controller");

const router = require("express").Router();

router.post("/", createAdmin);
router.get("/", getAllAdmins);
router.put("/:id", updateAdminById);
router.get("/:id", getAdminById);
router.delete("/:id", deleteById);

module.exports = router;
