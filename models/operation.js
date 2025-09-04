const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Admin = require("./admin");
const Order = require("./order");

const Operation = sequelize.define(
  "operation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    operation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255), // 15 emas, uzunroq qildim, tavsiya
    },
  },
  {
    timestamps: true,
  }
);

Admin.belongsToMany(Order, { through: Operation });
Order.belongsToMany(Admin, { through: Operation });

Operation.belongsTo(Admin);

module.exports = Operation;
