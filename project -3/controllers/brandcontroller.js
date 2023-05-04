const Brand = require('../models/brandmodel')

addbrand = (req,res)=>{
    // console.log(req.body)
    // console.log(req.file)

    var validate = ""
    if(req.body.brand_name == "")
    { validate+= "Brand name is required" }
    if(req.body.description == "")
    { validate+= "Description is required" }

    if(!!validate)
    {
        res.json({
            status:409,
            success:false,
            msg: validate
        })
    }else{
        //check duplicacy
        Brand.findOne({brand_name:req.body.brand_name})
        .then(branddata=>{
            // console.log(branddata)
            if(branddata == null)
            {
                //insert
                let brandobject = new Brand()
                brandobject.brand_name = req.body.brand_name
                brandobject.description = req.body.description
                if(req.file)
                {
                    brandobject.brand_logo = "brand/"+req.file.filename
                }
                brandobject.save()

                res.json({
                    status:200,
                    success:true,
                    msg:'Brand inserted'
                })
            }
            else{
                res.json({
                    status:409,
                    success:false,
                    msg:'Brand already exists'
                })
            }
        })
    }
}

getall = (req,res)=>{

    limit_num = 3
    skip_count = 0

    if(req.body.page_no >1)
    {
        skip_count = (req.body.page_no-1)*limit_num
    }

    // console.log("Skip Count = "+skip_count)

    Brand.find()
    .sort({_id:-1})
    .limit(limit_num)
    .skip(skip_count)
    .then(data=>{
        res.json({
            status:200,success:true,msg:"data loaded",data:data
        })
    })
    .catch(err=>{
        res.json({
            status:500,success:false,msg:"error",error:String(err)
        })
    })
}

deletebrand = (req,res)=>{
    var validate = ""
    if(req.body._id == "")
    {
        validate += "ID is required \n"
    }

    if(!!validate)
    {
        //error msg 
        res.json({
            status:409,
            success:false,
            msg:validate
        })
    }
    else{
        //check whether data exists or not wrt particular ID
        Brand.findOne({_id:req.body._id})
        .then(data=>{
            if(data == null)
            {
                res.json({
                    status:409,
                    success:false,
                    msg:'no data found'
                })
            }
            else{
                //permanent delete
                Brand.deleteOne({_id:req.body._id})
                .then(data=>{
                    res.json({
                        status:200,success:true,msg:'Data Deleted'
                    })
                })
            }
        })
    }
}

enabledisablebrand = (req,res)=>{
    var validate = ""
    if(req.body._id == "")
    {
        validate += "ID is required \n"
    }
    if(req.body.isblocked == "")
    {
        validate += "Status is required \n"
    }

    if(!!validate)
    {
        //error msg 
        res.json({
            status:409,
            success:false,
            msg:validate
        })
    }
    else{
        //check whether data exists or not wrt particular ID
        Brand.findOne({_id:req.body._id})
        .then(data=>{
            if(data == null)
            {
                res.json({
                    status:409,
                    success:false,
                    msg:'no data found'
                })
            }
            else{
                //enable/disbale
                data.isblocked = req.body.isblocked
                data.save()
                res.json({
                    status:200,success:true,msg:'Data Status changed'
                })
                
            }
        })
    }
}


module.exports = {
    addbrand,
    getall,
    deletebrand,
    enabledisablebrand
}