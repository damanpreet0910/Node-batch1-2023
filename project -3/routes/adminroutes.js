// console.log("My routing file works")
const routes = require('express').Router()
const categorycontroller = require('../controllers/categoryController') 
const productcontroller = require('../controllers/productcontroller')
const brandcontroller = require("../controllers/brandcontroller")
const studentcompetitioncontroller = require("../controllers/studentcompetitioncontroller")
const usercontroller = require("../controllers/usercontroller")
const dashboardcontroller = require("../controllers/dashboardcontroller")
const multer  = require('multer')

const brandstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/brand')
    },
    filename: function (req, file, cb) {
    //   console.log(file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(uniqueSuffix+ file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix+ file.originalname)
    }
  })
  
  const brandupload = multer({ storage: brandstorage })


routes.post("/register",usercontroller.register)
routes.post("/changepassword",usercontroller.changepassword)
routes.post("/login",usercontroller.login)

routes.use(require('../config/middleware'))
routes.post("/dashboard",dashboardcontroller.dashboard)

// category routes start 
routes.post("/addcategory",categorycontroller.addcategory)
routes.post("/getallcategory",categorycontroller.getall)
routes.post("/getsinglecategory",categorycontroller.getsingle)
// category routes end 

// product routes start 
routes.post("/addproduct",productcontroller.addproduct)
routes.post("/getallproduct",productcontroller.getall)
routes.post("/updateproduct",productcontroller.update)

routes.post("/addbrand",brandupload.single('brand_logo'),brandcontroller.addbrand)
routes.post("/getallbrand",brandcontroller.getall)
routes.post("/deletebrand",brandcontroller.deletebrand)
routes.post("/enabledisablebrand",brandcontroller.enabledisablebrand)

routes.post("/addstucomp",studentcompetitioncontroller.add)
routes.post("/getallstucomp",studentcompetitioncontroller.getall)



module.exports = routes