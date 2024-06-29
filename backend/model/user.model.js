import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:false,
        default:null
    },
    pincode:{
        type:Number,
        required:false,
        default:null
    },
    otp:{
        type:String,
        default:null
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    loginType:{
        type:String,
        default:"form",
        enum:["form","google"]
    },
    role:{
        type:String,
        default:"User",
        enum:["User","GC","Manager"]
    },
    gcWorkingStatus:{
        type:String,
        default:null,
        enum:["Free","Assigned"]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    regionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Region",
        default:null,
        required:false
    }
},{timestamps:true});

export default mongoose.model("User",userSchema);