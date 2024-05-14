import express from "express"
import { 
    addNewAdmin,
    getAllDoctor, 
    getUserDetails, 
    logOutAdmin, 
    logOutPatient, 
    login, 
    patientRregister 
} from "../controller/userController.js";
import {
     isAdminAuthenticated,
     isPatientAuthenticated
 } from "../middlewares/auth.js";


const router =express.Router();

router.post("/patient/register",patientRregister)
router.post("/login",login)
router.post("/admin/addnew",isAdminAuthenticated,addNewAdmin)
router.get("/doctors",getAllDoctor)
router.get("/admin/me",isAdminAuthenticated,getUserDetails)
router.get("/patient/me",isPatientAuthenticated,getUserDetails)
router.get("/admin/logout",isAdminAuthenticated,logOutAdmin)
router.get("/patient/logout",isPatientAuthenticated,logOutPatient)
export default router;