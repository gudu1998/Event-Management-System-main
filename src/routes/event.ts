import { Router } from "express";
const router  = Router()

import eventController from "../controllers/event";

router.post('/createEvent', new eventController().createEvent); 
 

export default router
