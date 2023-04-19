const Category = require('../models/categorymodel')

function addcategory(req,res)
{
    var validation = ""
    if(req.body.category_name == "")
    {
        validation += "Category name is required \n"
    }
    if(req.body.category_description == "")
    {
        validation += "Category Description is required \n"
    }

    if(!!validation)
    {
        res.json({
            status:409,
            success:false,
            msg:validation
        })
    }
    else{
        let categoryobject = new Category()
        categoryobject.category_name = req.body.category_name
        categoryobject.category_description = req.body.category_description
        categoryobject.save()
    
        res.json({
            'status':200,
            'success':true,
            'msg':'Category inserted',
            'data':req.body
        })
    }
}

getall = (req,res)=>{
    Category.find(req.body).exec()
    .then(categorydata=>{
        res.json({
            status:200,
            success:true,
            msg : 'data loaded',
            data:categorydata
        })
    })
    .catch(err=>{
        res.json({
            status : 500,
            success : false,
            msg : 'Error Occur',
            error : String(err)
        })
    })
}

getsingle = (req,res)=>{
    var validate = ""
    if(req.body._id == "")
    {
        validate += "_id is required"
    }


    if(!!validate)
    {
        res.json({
            status:409,
            success:false,
            msg : validate
        })
    }
    else{
        Category.findOne({_id:req.body._id})
        .then(categorydata=>{
            res.json({
                status:200,
                success:true,
                msg:'data loaded',
                data:categorydata
            })    
        })
        .catch(err=>{
            res.json({
                status : 500,
                success : false,
                msg : 'Error Occur',
                error : String(err)
            })
        })
    }
}
module.exports = {
    addcategory,
    getall,
    getsingle
}