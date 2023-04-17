const express = require('express')
const app = express()
const port = 4000
const config = require('./config/db')

app.use(express.urlencoded({extended:true}))

const adminroutes = require('./routes/adminroutes')
app.use("/admin",adminroutes)

app.listen(port,()=>{
    console.log("Server running at port "+port)
})