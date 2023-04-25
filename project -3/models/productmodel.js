const mongoose = require("mongoose")

const productschema = new mongoose.Schema({
    categoryId : { type : mongoose.SchemaTypes.ObjectId,ref:'category',default:null},
    product_name : { type : String,default:null},
    price : { type: Number,default:0},
    quantity : { type: Number,default:0},
    description : { type: String,default:null},
    image : { type: String,default:'no-image.png'},
    created_at : { type: Date,default:Date.now()},
})

module.exports = new mongoose.model('product',productschema)