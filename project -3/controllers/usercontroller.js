const User = require('../models/usermodel')
const Customer = require('../models/customermodel')
const bcrypt = require("bcrypt")
const saltround  = 10
const jwt = require('jsonwebtoken')
const secretkey = "project123#@"

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

changepassword = (req,res)=>{
    validator = ""
    if(req.body.oldpassword == "")
        validator += "Old Password is required"
    if(req.body.newpassword == "")
        validator += "New Password is required"
    if(req.body.confirmpassword == "")
        validator += "Confirm Password is required"
    if(req.body.userId == "")
        validator += "User Id is required"
    
    if(!!validator)
    {
        res.json({
            status: 200,
            success:true,
            msg:validator
        })
    }
    else{
        //compare new password with confirm password
        if(req.body.newpassword == req.body.confirmpassword)
        {
            // res.json({
            //     msg:"new password and confirm password are same"
            // })
            //get data with respect to user
            User.findOne({_id:req.body.userId})
            .then(userdata=>{
                // console.log(userdata)

                //compare old password with database
                bcrypt.compare(req.body.oldpassword,userdata.password,(data,err)=>{
                    if(err)
                    {
                        res.json({
                            status:409,
                            success:false,
                            msg:"old password not matched"
                        })
                    }
                    else{
                        //Update password
                        userdata.password = bcrypt.hashSync(req.body.newpassword,saltround)
                        userdata.save()
                        res.json({
                            status:200,
                            success:true,
                            msg:"Password Updated"
                        })

                    }
                })
            })
        }
        else{
            res.json({
                status:409,
                success:false,
                msg:"new password and confirm password are not same"
            })
        }
    }
}

login = (req,res)=>{
    validator = ""
    if(req.body.email == "")
        validator +="Email reqiured"
    if(req.body.password == "")
        validator +="Password reqiured"
    
    if(!!validator)
    {
        res.json({
            status:409,success:false,msg:validator
        })
    }else{
        // check user existance
        User.findOne({email:req.body.email})
        .then(userdata=>{
            if(userdata == null)
            {
                res.json({
                    status:404,
                    success:false,
                    msg:'User not found'
                })
            }else{
                //compare db password with user password
                bcrypt.compare(req.body.password,userdata.password,(err,data)=>{
                    if(err){
                        res.json({
                            status:409,success:false,msg:'Invalid password'
                        })
                    }else{
                        //create payload
                        payload = {
                            _id:userdata._id,
                            name:userdata.name,
                            email:userdata.email,
                            userType:userdata.userType,
                        }

                        token = jwt.sign(payload,secretkey)
                        res.json({
                        status:200,success:true,msg:'login successfully',data:userdata,token:token
                        })
                    }
                })
            }
        })
    }
}
module.exports = {
    register,
    changepassword,
    login
}