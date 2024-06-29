import { generateResponse } from "../helpers/response.helper.js";
import userModel from "../model/user.model.js";

export const checkGC = async(req,res,next)=>{
    const user = await userModel.findOne({_id: req.userId});
    // console.log(user);
    if(user.role==='GC'){
        next();
    }
    else
    return generateResponse(res,400,"Unauthorized",null,false);
}