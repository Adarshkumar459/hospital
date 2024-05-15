import { Message } from "../models/messageSchema.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";


// send user message 
export const sendMessage = catchAsyncError(async (req , res , next)=>{
    const {firstName, lastName, email, phone, message}= req.body;
    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("plese fill full form!",400))
    }
        await Message.create({firstName, lastName, email, phone, message});
        res.status(200).json({
            success: true,
            message: "message sent successfully",
        })
    
})

export const getAllMessage = catchAsyncError (async(req,res,next)=>{
    const message = await Message.find();
    
    res.status(200).json({
        success: true,
        message,
    })
})