const Client = require("../models/client");
const Order = require("../models/order");

const addClient = async (req, res) => {
  try {
    const { full_name, phone_number, email, address, location } = req.body;
    const candidate = await Client.findOne({ where: { email } });
    if (candidate) {
      return res
        .status(403)
        .send({ message: "Bu emaildagi client avvaldan mavjud" });
    }
    const newClient = await Client.create({
      full_name,
      phone_number,
      email,
      address,
      location,
    });
    res.status(201).send({
      message: "New Client added",
      data: newClient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "Client qo'shishda xatolik" });
  }
};

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll({ include: Order });
    res.status(201).send({
      message: "All clients",
      data: clients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "Clientlarni korishda xatolik" });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    res.status(201).send({
      message: "client",
      data: client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "Client korishda xatolik" });
  }
};

const updateClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(200).send({
      message: "Client updated",
      data: client[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "Client update qilishda xatolik" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.destroy({ where: { id } });
    res.status(200).send({
      message: "client deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).end({ error: "Client o'chirishda xatolik" });
  }
};

module.exports = {
  addClient,
  updateClientById,
  getAllClients,
  getClientById,
  deleteById,
};
