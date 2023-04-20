const Brand = require('../models/brandmodel')

addbrand = (req,res)=>{
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

module.exports = {
    addbrand
}