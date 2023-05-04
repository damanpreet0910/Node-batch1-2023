const express = require('express')
const app = express()
const port = 4000
const config = require('./config/db')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.use(express.json({limit:'50mb'}))

const adminroutes = require('./routes/adminroutes')
app.use("/admin",adminroutes)

const seeder = require("./config/seeder")
seeder.adminseeder()

app.listen(port,()=>{
    console.log("Server running at port "+port)
})