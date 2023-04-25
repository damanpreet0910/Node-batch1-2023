const SudentComp = require('../models/studentcompetitionmodel')

add = (req,res)=>{
    //validation
    var validation = ""
    if(req.body.first_name == "")
        validation += "First name is required"
    if(req.body.last_name == "")
        validation += "Last name is required"
    if(req.body.competition_name == "")
        validation += "competition name is required"
    if(req.body.student_name == "")
        validation += "Student name is required"
    if(req.body.student_rollno == "")
        validation += "Rollno is required"
    if(req.body.college_name == "")
        validation += "College name is required"
    if(req.body.date_of_competition == "")
        validation += "date_of_competition is required"



    if(!!validation)
    {
        res.json({
            status:409,
            success:false,
            msg:validation
        })
    }
    else{

        //duplicate
        SudentComp.findOne({student_rollno:req.body.student_rollno})
        .then(studata=>{
            if(studata==null)
            {
                //insert
                let studecompobject = new SudentComp()
                studecompobject.first_name = req.body.first_name
                studecompobject.last_name = req.body.last_name
                studecompobject.competition_name = req.body.competition_name
                studecompobject.student_name = req.body.student_name
                studecompobject.student_rollno = req.body.student_rollno
                studecompobject.college_name = req.body.college_name
                studecompobject.date_of_competition = req.body.date_of_competition
        
                studecompobject.save()
        
                res.json({
                    status:200,success:true,msg:"record inserted"
                })
            }
            else{
                res.json({
                    status:409,success:false,msg:"student with same rollno already exists"
                })
            }
        })
       
    }
    
}


getall = (req,res)=>{
    SudentComp.find(req.body)
    .then(data=>{
        res.json({
            status:200,
            success:true,
            msg:'data loaded',
            data:data
        })
    })
    .catch(err=>{
        res.json({
            success:false,
            status:500,
            msg:'Error',
            error:String(err)
        })
    })
}

module.exports = {
    add,
    getall
}