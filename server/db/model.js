const  mongoose=require('mongoose');


const Schema= mongoose.Schema({
 
    userid: {
    type : String,
    default: " "},
    password: {
    type : String,
    default: " "},
    profile: {
        name:{
            type : String,
            default: " "},
        phone:{
            type : String,
            default: " "},
        email:{
            type : String,
            default: " "},
    },
    bicycles: [
        {
            // img:
            // {
            //     data: Buffer,
            //     contentType: String
            // },
            title: String,
            description: String,
            SP: Number,
        }
    ]
})

const user=mongoose.model("user",Schema);
module.exports=user;