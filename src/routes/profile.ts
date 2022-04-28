import { Router } from "express";
import ProfileController from "../controllers/profile";

const router  = Router()

router.post('/createProfile', new ProfileController().createProfile); 
router.get('/viewProfile', new ProfileController().viewProfile); 
router.get('/editProfile', new ProfileController().editProfile); 

export default router
