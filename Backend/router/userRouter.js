import express from "express"
import { patientRregister } from "../controller/userController.js";


const router =express.Router();

router.post("/patient/register",patientRregister)

export default router;