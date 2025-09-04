const status = require("../models/status");

const addstatus = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newstatus = await status.create({
      name,
      description,
    });
    res.status(201).json({
      message: "New status added",
      data: newstatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "status qo'shishda xatolik" });
  }
};

const getAllstatuss = async (req, res) => {
  try {
    const statuss = await status.findAll();
    res.status(200).json({
      message: "All statuss",
      data: statuss,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "statuslarni korishda xatolik" });
  }
};

const getstatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundstatus = await status.findByPk(id);

    if (!foundstatus) {
      return res.status(404).json({ error: "status topilmadi" });
    }

    res.status(200).json({
      message: "status",
      data: foundstatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "status korishda xatolik" });
  }
};

const updatestatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await status.update(req.body, {
      where: { id },
      returning: true,
    });

    if (!updated[1][0]) {
      return res.status(404).json({ error: "status topilmadi" });
    }

    res.status(200).json({
      message: "status updated",
      data: updated[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "status update qilishda xatolik" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await status.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "status topilmadi" });
    }

    res.status(200).json({
      message: "status deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "status o'chirishda xatolik" });
  }
};

module.exports = {
  addstatus,
  updatestatusById,
  getAllstatuss,
  getstatusById,
  deleteById,
};
