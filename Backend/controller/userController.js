import {catchAsyncError}  from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";


export const patientRregister= catchAsyncError(async (req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone, 
        adhar,        
        dob,
        gender,
        password,        
        role,
        
    } =req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !adhar||        
        !dob ||
        !gender ||
        !password ||
        !role
        ) {
        return next(new ErrorHandler("plese fill full form !",400))
    }
    let user= await User.findOne({email})
    if (user){
        return next(new ErrorHandler("User already Registered!",400))
    }

    user = await User.create({
        firstName,
        lastName,
        email,
        phone, 
        password,
        gender,
        dob,
        role,
        adhar,
    })
    res.status(200).json({
        success:true,
        message:"user Registered !",
    })
})