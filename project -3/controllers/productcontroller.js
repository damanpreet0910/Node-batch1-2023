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


module.exports = {
    addproduct
}