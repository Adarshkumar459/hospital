import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3,"first name must contain at least 3 characters!"],
    },

    lastName:{
        type: String,
        required: true,
        minLength: [3,"last name must contain at least 3 characters!"],
    },

    email:{
        type: String,
        required: true,
        validate:[validator.isEmail,"plese enter valid email !"],
    },

    phone:{
        type: String,
        required: true,
        minLength: [10,"phnoe no min must be 10 digit!"],
        maxLength: [10,"phnoe no min must be 10 digit!"],
    },
   adhar:{
        type: String,
        required: true,
        minLength: [12,"nic min must be 12 digit!"],
        maxLength: [12,"nic min must be 12 digit!"],
    },
    dob:{
        type: Date,
        required: [true,"DOB is must required"],
    },
    gender:{
        type: String,
        required:true,
        enum:["Male","Female"],
    },
    password:{
        type:String,
        minLength: [8,"password min must be 8 digit!"],
        required: true,
        select:false

    },
    role:{
        type: String,
        required:true,
        enum:["Admin","Patient"],
    },
    doctorDepartment:{
        type:String,
    },
    docAvtar:{
        public_id:String,
        url:String,
    },

})

userSchema.pre("save",async function(next){
    if (!this.isModified("password")) {
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.comaprePassword= async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.generateJsonToken=function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    })
}

export const User =mongoose.model("User",userSchema);