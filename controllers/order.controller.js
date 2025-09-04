const { model } = require("../config/db");
const Admin = require("../models/admin");
const Client = require("../models/client");
const Order = require("../models/order");

const addOrder = async (req, res) => {
  try {
    const { product_link, quantity, sum, truck, desc, clientId } = req.body;
    const newOrder = await Order.create({
      product_link,
      quantity,
      sum,
      truck,
      desc,
      clientId,
    });
    res.status(201).send({
      message: "New Order added",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "Order qo'shishda xatolik" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      //include: Client
      include: [
        { model: Client, required: true, attributes: ["full_name", "email"] },
        { model: Admin },
      ],
      attributes: ["product_link", "sum"],
    });
    res.status(201).send({
      message: "All orders",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "Orderlarni korishda xatolik" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    res.status(201).send({
      message: "order",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "Order korishda xatolik" });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(200).send({
      message: "Order updated",
      data: order[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "Order update qilishda xatolik" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.destroy({ where: { id } });
    res.status(200).send({
      message: "order deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "Order o'chirishda xatolik" });
  }
};

module.exports = {
  addOrder,
  updateOrderById,
  getAllOrders,
  getOrderById,
  deleteById,
};
