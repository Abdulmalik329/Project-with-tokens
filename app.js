const express = require("express");
const config = require("config");
const sequelize = require("./config/db");
const cookieParse = require("cookie-parser");
const mainRouter = require("./routes");
const viewsRouter = require("./routes/views.routes copy");
const errorHanding = require("./middlewares/errors/error.handing");
const exHbs = require("express-handlebars");

const PORT = config.get("port") ?? 3333;



const app = express();
app.use(express.json());
app.use(cookieParse());
const hdb = exHbs.create({
  defaultLayout: "main",
  extname: "hbs",
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
//server static
app.use(express.static("views"));

app.use(express.static("views"));

app.use("/api", mainRouter);
app.use("/", viewsRouter);


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
