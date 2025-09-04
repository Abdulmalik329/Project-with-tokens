const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define(
  "admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(50),
    },
    user_name: {
      type: DataTypes.STRING(15),
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING(30),
      unique: true,
    },
    tg_link: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    token: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    is_creator: {
      type: DataTypes.BOOLEAN,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
    description: {
      type: DataTypes.STRING(30),
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Admin;
