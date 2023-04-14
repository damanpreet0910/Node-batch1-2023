const express = require("express")
const app = express()
const port = 4000

app.use(express.urlencoded({extended:true}))

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


app.post("/addcategory",(req,res)=>{
    console.log(req.body)
    res.json({
        'status': 200,
        'success':true,
        'msg':'Category Inserted',
        'data':req.body
    })
})

app.post("/getallcategory",(req,res)=>{
    // console.log(req.body)

    var category_array = [
        {
            'category_name' : 'category 1',
            'description' : 'Demo description'
        },
        {
            'category_name' : 'category 2',
            'description' : 'Demo description2'
        },
        {
            'category_name' : 'category 3',
            'description' : 'Demo description3'
        }

    ]

    res.json({
        'status': 200,
        'success':true,
        'msg':'Category Inserted',
        'data': category_array
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