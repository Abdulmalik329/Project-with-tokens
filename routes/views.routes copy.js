const { createViewPage } = require("../helpers/create.view.page");


const router = require("express").Router();

router.get("/", (req, res) => {
  res.render(createViewPage("index"), 
  {
    title:"Asosiy sahifa",
    isHome:true, 
  })
});

router.get("/order", (req, res) => {
  res.render(createViewPage("order"), 
  {
    title:"Order sahifa",
    isOrder:true, 
  })
});

router.get("/oper", (req, res) => {
  res.render(createViewPage("oper"), 
  {
    title:"Oper sahifa",
    isoper:true, 
  })
});

router.get("/login", (req, res) => {
  res.render(createViewPage("login"), 
  {
    title:"Login sahifa",
    islogin:true, 
  })
});


module.exports = router;
