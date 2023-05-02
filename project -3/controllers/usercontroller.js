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
    var validate = ""
    if(req.body.oldpassword == "")
    {
        validate += "Old Password is required \n"
    }
    if(req.body.newpassword == "")
    {
        validate += "New password is required \n"
    }    
    if(req.body.confirmpassword == "")
    {
        validate += "confirm password is required \n"
    }    
    if(req.body.userId == "")
    {
        validate += "User Id is required \n"
    }    

    if(!!validate)
    {
        res.json({
            status:409,
            success:false,
            msg:validate
        })
    }
    else{
        //compare new password with confirm password
        if(req.body.newpassword == req.body.confirmpassword)
        {
            //check user existance
            User.findOne({_id:req.body.userId})
            .then(userdata=>{
                if(userdata == null)
                {
                    res.json({
                        status:409,
                        success:false,
                        msg:"User not found"
                    })   
                }
                else{
                    //compare old password with db password
                    console.log(req.body.oldpassword)
                    bcrypt.compare(req.body.oldpassword,userdata.password,(err,data)=>{
                    console.log(req.body.sdata)

                        if(data)
                        {
                            //Update password
                            userdata.password = bcrypt.hashSync(req.body.newpassword,saltround)
                            userdata.save()
                            res.json({
                                status:200,
                                success:true,
                                msg:"Password Changed"
                            })
                        }
                        else{
                            res.json({
                                status:409,
                                success:false,
                                msg:"old password do not match"
                            })
                        }
                    })
                }
            })
        }
        else{
            res.json({
                status:409,
                success:false,
                msg:"new password and confirm password don not match"
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