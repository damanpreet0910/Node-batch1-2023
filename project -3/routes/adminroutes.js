// console.log("My routing file works")
const routes = require('express').Router()
const categorycontroller = require('../controllers/categoryController') 
const productcontroller = require('../controllers/productcontroller')
const brandcontroller = require("../controllers/brandcontroller")

routes.post("/addcategory",categorycontroller.addcategory)
routes.post("/getallcategory",categorycontroller.getall)
routes.post("/getsinglecategory",categorycontroller.getsingle)

routes.post("/addproduct",productcontroller.addproduct)

routes.post("/addbrand",brandcontroller.addbrand)

module.exports = routes