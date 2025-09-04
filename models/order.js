const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Client = require("./client");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    unique_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    product_link: {
      type: DataTypes.STRING(2000),
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    sum: {
      type: DataTypes.DECIMAL(15, 2),
    },
    truck: {
      type: DataTypes.STRING(30),
    },
    desc: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

Client.hasMany(Order);
Order.belongsTo(Client);



module.exports = Order;
