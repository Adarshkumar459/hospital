import mongoose from "mongoose";


export const dbConnect= ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "MERN_HOSPITAL"
    })
    .then(()=>{
        console.log("connected to database");
    })
    .catch((err)=>{
        console.log(`some error i db connection ${err}`)
    })
}