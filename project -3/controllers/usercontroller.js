const User = require('../models/usermodel')
const Customer = require('../models/customermodel')
const bcrypt = require("bcrypt")
const saltround  = 10

register = (req,res)=>{
    validator = ''
    if(req.body.name == "")
        validator += "NAme is required"
    if(req.body.email == "")
        validator += "Email is required"
    if(req.body.password == "")
        validator += "Password is required"
    if(req.body.contact == "")
        validator += "Contact is required"
    if(req.body.address == "")
        validator += "Address is required"
    
    if(!!validator)
    {
        res.json({
            status:409,success:false,msg:validator
        })
    }
    else{
        //duplicacy
        User.findOne({email:req.body.email})
        .then(udata=>{
            if(udata == null)
            {
                //Insert User model
                let userobj = new User()
                userobj.name = req.body.name
                userobj.email = req.body.email
                userobj.password = bcrypt.hashSync(req.body.password,saltround)
                userobj.save()
                .then(userdata=>{
                    let customerobj = new Customer()
                    customerobj.name = req.body.name
                    customerobj.email = req.body.email
                    customerobj.password = req.body.password
                    customerobj.contact = req.body.contact
                    customerobj.address = req.body.address
                    customerobj.userId = userdata._id
                    customerobj.save()

                    res.json({
                        status:200,success:true,msg:'user registered'
                    })
                })
            }
            else{
                res.json({
                    status:409,success:false,msg:'User already exists'
                })
            }
        })

    }
}


module.exports = {
    register
}