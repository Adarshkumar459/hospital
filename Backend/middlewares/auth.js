import { catchAsyncError } from "./catchAsyncError.js"
import ErrorHandler from "./errorMiddleware.js"
import jwt from "jsonwebtoken"
import {User} from "../models/userSchema.js"

// admin authentication
export const isAdminAuthenticated= catchAsyncError(async(req,res,next)=>{
    const token=req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin Not Authentation",400))
    }
    const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources`,403))
    }
    next();
})

// Patient authentation
export const isPatientAuthenticated= catchAsyncError(async(req,res,next)=>{
    const token=req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("Patient Not Authentation"))
    }
    const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources`,403))
    }
    next();
})

// export const isAuthorized = (...role) => {
//     return (req, res, next) => {
//       if (!role.includes(req.user.role)) {
//         return next(
//           new ErrorHandler(
//             `${req.user.role} not allowed to access this resource!`
//           )
//         );
//       }
//       next();
//     };
//   };