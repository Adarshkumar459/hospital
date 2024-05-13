import exprrss from "express"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import { dbConnect } from "./database/dbConnect.js"
import messageRouter from "./router/messageRouter.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js"
import userRouter from "./router/userRouter.js"

const app = exprrss()
config({path:"./config/config.env"})

app.use(cors({
    origin:[process.env.FRONTEND_URL, process.env.DESHBOARD_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}))

app.use(cookieParser());
app.use(exprrss.json());
app.use(exprrss.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
}))

app.use("/api/v1/message",messageRouter)
app.use("/api/v1/user",userRouter)
dbConnect()


app.use(errorMiddleware);
export default app