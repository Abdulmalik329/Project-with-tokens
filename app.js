const express = require("express");
const config = require("config");
const sequelize = require("./config/db");

const mainRouter = require("./routes");
const errorHanding = require("./middlewares/errors/error.handing");

require("dotenv").config({path:`.env.${process.env.NODE_ENV}`})

const PORT = config.get("port") ?? 3333;

console.log(process.env.NODE_ENV);
console.log(process.env.secret);
console.log(config.get("secret")); 
console.log(config.get("port")); 
 
process.on("UnkanughtExtpation exsample", (exception) => {
  console.log("UnkanughtExtpation", exception.message);
}); 

process.on("unhandledRejection example", (reject) => {
  console.log("unhandledRejection", reject);
});

const app = express();  
app.use(express.json());

app.use("/api", mainRouter);

app.use(errorHanding);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
