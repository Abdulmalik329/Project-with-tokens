const {
  addClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteById,
} = require("../controllers/client.controller");

const router = require("express").Router();

router.post("/", addClient);
router.get("/", getAllClients);
router.put("/:id", updateClientById);
router.get("/:id", getClientById);
router.delete("/:id", deleteById);

module.exports = router;
