import { Router } from "express";
import AdminController from "../controllers/admin";

const router  = Router()

router.post('/register', new AdminController().signupAdmin); 
router.post('/login', new AdminController().signinAdmin); 

export default router
