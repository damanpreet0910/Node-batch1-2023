const express = require("express")
const app = express()
const port = 4000

app.get("/",function(req,res){
    // console.log("My First api Works")
    res.json({
        'status':200,
        'success':true,
        'msg':'My First api works'
    })
})

app.get("/home",(req,res)=>{
    res.json({
        'status': 200,
        'success':true,
        'msg':'Home Page Works'
    })
})

app.all('*',(req,res)=>{
    res.json({
        'status': 404,
        'success':false,
        'msg':'Route not found'
    })
})

app.listen(port,()=>{
    console.log("Server running at port "+port)
})