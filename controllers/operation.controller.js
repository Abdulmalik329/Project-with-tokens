const Operation = require("../models/operation");
const Admin = require("../models/admin");
const Order = require("../models/order");
const { model } = require("../config/db");

const addOperation = async (req, res) => {
  try {
    const { operation_date, description, adminId, orderId } = req.body;
    const newOperation = await Operation.create({
      operation_date,
      description,
      adminId,
      orderId,
    });
    res.status(201).json({
      message: "New Operation added",
      data: newOperation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Operation qo'shishda xatolik" });
  }
};

const getAllOperations = async (req, res) => {
  try {
    const operations = await Operation.findAll({ include: [{ model: Admin }] });
    res.status(200).json({
      message: "All operations",
      data: operations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Operationlarni ko‘rishda xatolik" });
  }
};

const getOperationById = async (req, res) => {
  try {
    const { id } = req.params;
    const operation = await Operation.findByPk(id);
    res.status(200).json({
      message: "operation",
      data: operation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Operation ko‘rishda xatolik" });
  }
};

const updateOperationById = async (req, res) => {
  try {
    const { id } = req.params;
    const operation = await Operation.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(200).json({
      message: "Operation updated",
      data: operation[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Operation update qilishda xatolik" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await Operation.destroy({ where: { id } });
    res.status(200).json({
      message: "Operation deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Operation o‘chirishda xatolik" });
  }
};

module.exports = {
  addOperation,
  getAllOperations,
  getOperationById,
  updateOperationById,
  deleteById,
};
