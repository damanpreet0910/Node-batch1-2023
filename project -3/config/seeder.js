const User = require('../models/usermodel')
const bcrypt = require('bcrypt')
const saltround = 10

exports.adminseeder = (req,res)=>{
    User.findOne({email:'admin@gmail.com'})
    .then(userdata=>{
        if(userdata == null)
        {
            //insert 
            let userobject = new User()
            userobject.name = "Admin"
            userobject.email = "admin@gmail.com"
            userobject.password = bcrypt.hashSync("123",saltround)
            userobject.userType = 1
            userobject.save()
            console.log("Admin inserted")
        }
        else{
            console.log("admin already exists")
        }
    })
}