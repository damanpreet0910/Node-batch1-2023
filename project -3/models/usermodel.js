const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    name : { type: String,default:null},
    email : { type: String,default:null},
    password : { type: String,default:null},
    status : { type: Boolean,default:true},
    userType : { type: Number,default:2}, //admin =1,customer = 2
    created_at : { type: Date,default:Date.now()},
})

module.exports = new mongoose.model('user',userschema)