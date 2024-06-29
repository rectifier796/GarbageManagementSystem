import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false,
        default:null
    },
    wasteType:{
        type:String,
        default:"Non-Hazardous",
        enum:["Non-Hazardous","Bulky","Hazardous"]
    },    
    regionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Region",
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Not Started",
        enum:["Not Started", "Ongoing", "Finished"]
    },
    latitude:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true
    },
    photo:[{
        data:Buffer,
        contentType:String
    }],
    gcId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false
    }
},{timestamps:true});


export default mongoose.model("Query",querySchema);