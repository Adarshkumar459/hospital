import mongoose from "mongoose"
import validator from "validator"

const appontmentSchema = new mongoose.Schema({
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
        minLength: [12," adhar no min length must be 12 digit!"],
        maxLength: [12," adhar no min length must be 12 digit!"],
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
    appontment_date:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    doctor:{
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
    },
    hasVisited:{
        type: Boolean,
        required: true,
    },
    doctorId:{
        type: mongoose.Schema,ObjectId,
        default: false,
    },
    patientId:{
        type: mongoose.Schema,ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["Pending","Accepted","Rejected"],
        default: "Pending",
    },

})

export const Appointment = mongoose.model("Appointment",appontmentSchema);