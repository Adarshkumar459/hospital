import {catchAsyncError}  from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary"

// register for user
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
        return next(new ErrorHandler( `${user.role} already Registered with given email!`,400))
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
    generateToken(user,"user Registered !",200,res)

})


// login function

export const login =catchAsyncError(async(req,res,next)=>{
    const {email,password,confirmPassword,role}=req.body;
    if (!email|| !password|| !confirmPassword|| !role) {
        return next(new ErrorHandler("plese provide all deatials",400))
    }
    if (password !==confirmPassword) {
        return next(new ErrorHandler("password or confirm password is not match",400))
    }

    const user =await User.findOne({email}).select("+password");
    if (!user) {
        return next(new ErrorHandler("your given info is not match our database",400))
    }
    const isPasswordMatch=await user.comaprePassword(password)
    if (!isPasswordMatch) {
        return next(new ErrorHandler("invalid password or email",400))
    }
    if (role !==user.role) {
        return next(new ErrorHandler("user with given role is not found",400))
    }
    generateToken(user,"user login successfully !",200, res)
})

// add new admin
export const addNewAdmin=catchAsyncError(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone, 
        adhar,        
        dob,
        gender,
        password,         
    } =req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !adhar||        
        !dob ||
        !gender ||
        !password
        ) {
        return next(new ErrorHandler("plese fill full form !",400))
    }
    const isRegister= await User.findOne({email});
    if (isRegister) {
        return next(new ErrorHandler(`${isRegister.role} is already Registered with given email !`,400))
    }
    const admin =await User.create({
        firstName,
        lastName,
        email,
        phone, 
        adhar,        
        dob,
        gender,
        password,
        role:"Admin",
    })
    res.status(200).json({
        success:true,
        message:"New Admin registered !",
    })
})

// get all deatails About all doctors
export const getAllDoctor= catchAsyncError(async (req,res,next)=>{
    const doctors= await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors,
    })
})

// get informartion about user and admin 
export const getUserDetails= catchAsyncError(async(req,res,next)=>{
    const user=await req.user;
    res.status(200).json({
        success:true,
        user,
    })
})

// log out function for admin
export const logOutAdmin=catchAsyncError(async(req,res,next)=>{
    res
    .status(200)
    .cookie("adminToken","",{
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: "Admin log out successfully",
    })
})

// log out function for patient
export const logOutPatient=catchAsyncError(async(req,res,next)=>{
    res
    .status(200)
    .cookie("patientToken","",{
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: "patient  log out successfully",
    })
})

// add new doctor
export const addNewDoctor = catchAsyncError(async(req,res,next)=>{
    if(!req.files ||Object.keys(req.files).length===0){
        return next(new ErrorHandler("Doctor Avtar Required",400))
    }
    const {docAvtar} =req.files;
    const allowedFormats= ["image/png" , "image/jpeg" , "image/webp"];
    if(!allowedFormats.includes(docAvtar.mimetype)){
        return next(new ErrorHandler("Files format not supported !",400));
    }
    const {
        firstName,
        lastName,
        email,
        phone, 
        adhar,        
        dob,
        gender,
        password,
        doctorDepartment        
    } = req.body;
    if ( 
        !firstName||
        !lastName||
        !email||
        !phone|| 
        !adhar||        
        !dob||
        !gender||
        !password||
        !doctorDepartment
    ) {
        return next(new ErrorHandler("please provide full deatials",400))
    }
    const isRegistered= await User.findOne({email})
    if (isRegistered) {
        return next (new ErrorHandler(`${isRegistered.role} is Already registered with this email`,400))
    }

    const cloudinaryResponce = await cloudinary.uploader.upload(
        docAvtar.tempFilePath
    );
    if (!cloudinaryResponce || cloudinaryResponce.error) {
        console.error("Cloudinary Error",cloudinaryResponce.error||"Unknown Cloudinary Error")
    }
    const doctor= await User.create({
        firstName,
        lastName,
        email,
        phone, 
        adhar,        
        dob,
        gender,
        password,
        doctorDepartment ,
        role: "Doctor",
        docAvtar :{
            public_id: cloudinaryResponce.public_id,
            url: cloudinaryResponce.secure_url,
        },
    })
    res.status(200).json({
        success: true,
        message :"New doctor Register",
        doctor
    })
})

