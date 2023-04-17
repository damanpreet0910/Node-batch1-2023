const mongoose = require("mongoose")

const categoryschema = new mongoose.Schema({
    category_name : {type:String,default:null}, 
    category_description : {type:String,default:null}, 
    created_at : {type:Date,default:Date.now()}
})

module.exports = new mongoose.model('category',categoryschema)