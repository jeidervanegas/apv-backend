import { Router } from "express";
import patientCtrl from "../controllers/patient.controller.js";
import checkAuth from "../middleware/authMiddleware.js";

const route = Router();

route.post('/add-patient', checkAuth, patientCtrl.addPatient)
route.get('/get-patient', checkAuth, patientCtrl.listPatient)

route.get('/:id', checkAuth, patientCtrl.opPatient)
route.put('/:id', checkAuth, patientCtrl.updatePatient)
route.delete('/:id', checkAuth, patientCtrl.deletePatient)


export default route;