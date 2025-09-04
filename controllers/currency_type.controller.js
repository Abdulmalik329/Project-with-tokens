const type = require("../models/currency_type");

const addType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newtype = await type.create({
      name,
      description,
    });
    res.status(201).json({
      message: "New type added",
      data: newtype,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "type qo'shishda xatolik" });
  }
};

const getAlltypes = async (req, res) => {
  try {
    const types = await type.findAll();
    res.status(200).json({
      message: "All types",
      data: types,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "typelarni korishda xatolik" });
  }
};

const gettypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundType = await type.findByPk(id);

    if (!foundType) {
      return res.status(404).json({ error: "type topilmadi" });
    }

    res.status(200).json({
      message: "type",
      data: foundType,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "type korishda xatolik" });
  }
};

const updatetypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await type.update(req.body, {
      where: { id },
      returning: true,
    });

    if (!updated[1][0]) {
      return res.status(404).json({ error: "type topilmadi" });
    }

    res.status(200).json({
      message: "type updated",
      data: updated[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "type update qilishda xatolik" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await type.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "type topilmadi" });
    }

    res.status(200).json({
      message: "type deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "type o'chirishda xatolik" });
  }
};

module.exports = {
  addType,
  updatetypeById,
  getAlltypes,
  gettypeById,
  deleteById,
};
