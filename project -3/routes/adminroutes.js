// console.log("My routing file works")
const routes = require('express').Router()
const categorycontroller = require('../controllers/categoryController') 

routes.post("/addcategory",categorycontroller.addcategory)


module.exports = routes