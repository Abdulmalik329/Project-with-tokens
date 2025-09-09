const {
  addUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const authGuard = require("../middlewares/guards/auth.guard");
const selfGuard = require("../middlewares/guards/self.guard");

const router = require("express").Router();

router.post("/", addUser);
router.get("/", authGuard, getUsers);
router.get("/:id", authGuard, selfGuard, getOneUser);
router.put("/:id", authGuard, selfGuard, updateUser);
router.delete("/:id", authGuard, selfGuard, deleteUser);

module.exports = router;
