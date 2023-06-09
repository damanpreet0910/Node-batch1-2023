const mongoose = require("mongoose")
const brandschema = new mongoose.Schema({
    brand_name : {type:String,default:null},
    brand_logo : {type:String,default:'no-image.jgp'},
    description : {type:String,default:null},
    isblocked : {type:Boolean,default:false},
    created_at : { type:Date,default:Date.now()}
})

module.exports = new mongoose.model('brand',brandschema)
