import { Router } from "express";

import vetCtrl from "../controllers/Vet.controllers.js";
import checkAuth from "../middleware/authMiddleware.js";

const route = Router();

//Area pública
route.post('/register', vetCtrl.register);
route.post('/', vetCtrl.login);
route.get('/confirm/:token', vetCtrl.confirm);

route.post('/forget-password', vetCtrl.forgetPassword)
route.get('/forget-password/:token', vetCtrl.validateToken)
route.post('/forget-password/:token', vetCtrl.newPassword)

//Area privada
route.get('/profile', checkAuth, vetCtrl.profile)
route.put('/profile/:id', checkAuth, vetCtrl.updateProfile)
route.put('/update-password', checkAuth, vetCtrl.updatePassword)


export default route;