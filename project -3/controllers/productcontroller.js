const Product = require('../models/productmodel')

addproduct = (req,res)=>{
    var validate = ""
    if(req.body.categoryId == "")
    {
        validate += "Category is required \n"
    }
    if(req.body.product_name == "")
    {
        validate += "Product Name is required \n"
    }
    if(req.body.price == "")
    {
        validate += "Price is required \n"
    }
    if(req.body.quantity == "")
    {
        validate += "Quantity is required \n"
    }
    if(req.body.description == "")
    {
        validate += "Description is required \n"
    }
    if(req.body.image == "")
    {
        validate += "Image is required \n"
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
        //insert
        let productobject = new Product()
        productobject.categoryId = req.body.categoryId
        productobject.product_name = req.body.product_name
        productobject.price = req.body.price
        productobject.quantity = req.body.quantity
        productobject.description = req.body.description
        productobject.image = req.body.image
        productobject.save()

        res.json({
            status:200,
            success:true,
            msg:'product inserted'
        })
    }
}

getall = (req,res)=>{
    Product.find(req.body)
    .populate('categoryId')
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

update = (req,res)=>{
    var validate = ""
    if(req.body.categoryId == "")
    {
        validate += "Category is required \n"
    }
    if(req.body.product_name == "")
    {
        validate += "Product Name is required \n"
    }
    if(req.body.price == "")
    {
        validate += "Price is required \n"
    }
    if(req.body.quantity == "")
    {
        validate += "Quantity is required \n"
    }
    if(req.body.description == "")
    {
        validate += "Description is required \n"
    }
    if(req.body.image == "")
    {
        validate += "Image is required \n"
    }
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
        Product.findOne({_id:req.body._id})
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
                //update
                data.categoryId = req.body.categoryId
                data.product_name = req.body.product_name
                data.price = req.body.price
                data.quantity = req.body.quantity
                data.description = req.body.description
                data.image = req.body.image
                data.save()

                res.json({
                    status:200,success:true,msg:'Data Updated'
                })
            }
        })
    }
}


module.exports = {
    addproduct,
    getall,
    update
}