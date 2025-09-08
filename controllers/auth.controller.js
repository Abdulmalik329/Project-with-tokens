const { sendErrorResponse } = require("../helpers/send.error.response");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");

const login = async (req, res) => {
  //UnkanughtExtpation

  try {
    setTimeout(function () {
      throw new Error("UnkanughtExtpation");
    }, 1000);
  } catch (error) {
    console.log(error);
  }

  //unhandledRejection

  new Promise((_, reject) => {
    reject(new Error("unhandledRejection example"));
  });

  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return sendErrorResponse(
        { message: "Email yoki password noto'g'ri" },
        res,
        401
      );
    }
    const verifyPassword = await bcrypt.compare(password, admin.password);

    if (!verifyPassword) {
      return sendErrorResponse(
        { message: "Email yoki password noto'g'ri" },
        res,
        401
      );
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const tokens = jwtService.generateTokens(payload);
    res.status(200).send(tokens);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  login,
};
