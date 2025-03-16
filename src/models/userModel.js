import mongoose from "mongoose"



let UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide a username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide a email"],
      
    },
    isVerfied:{
        type:Boolean,
        default:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
     forgotPasswordToken:String,
     forgotPasswordTokenExpiry:Date,
     verifyToken:String,
     verifyTokenExpiry:Date,
})

const User = mongoose.models.User || mongoose.model("User",UserSchema);
export default User;