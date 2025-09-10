const { User } = require("../models/user");
const { sendErrorResponse } = require("../helpers/send.error.response");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse({ message: "User already exists" }, res, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).send({ message: "New user added", data: newUser });
  } catch (err) {
    sendErrorResponse(err, res, 400);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows, [updatedUser]] = await User.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User updated", data: updatedUser });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  addUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
