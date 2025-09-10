const express = require("express");
const config = require("config");
const sequelize = require("./config/db");
const  MongoClient  =  require ( 'mongodb' ) . MongoClient ; 
const  url  =  "mongodb://localhost:27017/mydb" ;
const winston = require("winston");
// const express-winston = require("express-")
const mainRouter = require("./routes");
const errorHanding = require("./middlewares/errors/error.handing");
const logger = require("./services/loger.servec");

require("dotenv").config({path:`.env.${process.env.NODE_ENV}`})

logger.error("tract")
logger.info("log ma'lumotlari"),
logger.debug("debug ma'lumotlari")
logger.warn("log ma'lumotlari")

const PORT = config.get("port") ?? 3333;

// console.log(process.env.NODE_ENV);
// console.log(process.env.secret);
// console.log(config.get("secret")); 
// console.log(config.get("port")); 
 
process.on("UnkanughtExtpation exsample", (exception) => {
  console.log("UnkanughtExtpation", exception.message);
}); 

process.on("unhandledRejection example", (reject) => {
  console.log("unhandledRejection", reject);
});

const app = express();  
app.use(express.json());

    // var router = require('./my-express-router');

    // app.use(expressWinston.logger({
    //   transports: [
    //     new winston.transports.Console()
    //   ],
    //   format: winston.format.combine(
    //     winston.format.colorize(),
    //     winston.format.json()
    //   ),
    //   meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    //   msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    //   expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    //   colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    //   ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    // }));

    // app.use(router); // notice how the router goes after the logger.

app.use("/api", mainRouter);

app.use(errorHanding);

const start = async () => {
  try {
    const  client  =  new  MongoClient ( url ) ; 
    await  client.connect ( ) ;
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
