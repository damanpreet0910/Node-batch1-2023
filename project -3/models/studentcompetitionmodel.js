const mongoose = require("mongoose")

const studentcompetitionSchema = new mongoose.Schema({
    first_name : { type : String , default:null},
    last_name : { type : String , default:null},
    competition_name : { type : String , default:null},
    student_name : { type : String , default:null},
    student_rollno : { type : String , default:null},
    college_name : { type : String , default:null},
    date_of_competition : { type : Date , default:null},
     
}) 

module.exports = new mongoose.model('studentcompetition',studentcompetitionSchema)