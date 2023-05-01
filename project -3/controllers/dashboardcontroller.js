const Brand = require("../models/brandmodel")
const Category = require("../models/categorymodel")
const Product = require("../models/productmodel")

dashboard = async (req,res)=>{
    totalbrand = 0
    totalcategory = 0
    totalproduct = 0

    await Brand.countDocuments().then(brandcount =>{
        totalbrand = brandcount
    })

    await Category.countDocuments().then(categorycount =>{
        totalcategory = categorycount
    })

    await Product.countDocuments().then(productcount =>{
        totalproduct = productcount
    })

    res.json({
        status:200,success:true,msg:"dashboard loaded",total_brand : totalbrand,total_category : totalcategory, total_products : totalproduct
    })

}


module.exports = {
    dashboard
}