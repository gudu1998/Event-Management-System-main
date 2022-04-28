import { Router } from "express";
const router  = Router()

import eventController from "../controllers/event";

router.post('/createEvent', new eventController().createEvent); 
router.get('/joinEvent', new eventController().joinEvent); 
router.get('/leaveEvent', new eventController().leaveEvent); 
router.get('/getParticipants', new eventController().getParticipantsOfEvent); 

export default router
