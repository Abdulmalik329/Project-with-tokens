const { sendErrorResponse } = require("../helpers/send.error.response");
const Admin = require("../models/admin");
const Order = require("../models/order");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  try {
    const {
      full_name,
      user_name,
      password,
      confirm_password,
      phone_number,
      email,
      tg_link,
      is_creator,
      is_active,
      description,
    } = req.body;

    const candidate = await Admin.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse(
        {
          message: "Bu emaildagi foydalanuvchi avvaldan mavjud",
        },
        res,
        403
      );
    }

    if (password !== confirm_password) {
      return sendErrorResponse(
        {
          message: "Parollar mos emas",
        },
        res,
        400
      );
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newadmin = await Admin.create({
      full_name,
      user_name,
      password: hashedPassword,
      phone_number,
      email,
      tg_link,
      is_creator,
      is_active,
      description,
    });

    res.status(201).json({
      message: "New admin added",
      data: newadmin,
    });
  } catch (error) {
    return sendErrorResponse(error, res, 500);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({ include: [{ model: Order }] });
    res.status(200).json({
      message: "All admins",
      data: admins,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "adminlarni ko‘rishda xatolik" });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({
      message: "admin",
      data: admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "admin ko‘rishda xatolik" });
  }
};

const updateAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Admin.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(200).json({
      message: "admin updated",
      data: updated[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "admin update qilishda xatolik" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.destroy({ where: { id } });
    res.status(200).json({
      message: "admin deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "admin o‘chirishda xatolik" });
  }
};

module.exports = {
  createAdmin,
  updateAdminById,
  getAllAdmins,
  getAdminById,
  deleteById,
};
