import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Event from "../models/event";

export default class EventController{

    async createEvent(req:Request, res:Response) {
        let { creatorName, title, description, eventDate, eventTime, place, participants, maximumParticipantsAllowed } = req.body;
      
        try {
          const newEvent = new Event({
            creatorName,
            title,
            description,
            eventDate,
            eventTime,
            place,
            participants,
            maximumParticipantsAllowed
          });
      
          newEvent.save()
      
          res.status(StatusCodes.OK).send({message:"Event Created"})
        }
        catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Method: createEvent Class: EventController Error : ${error}`);
        }
      
      }

      async joinEvent(req:Request, res:Response)  {
        const { joinevent_id, participant } = req.query;
      
        try {
          const findEvent = await Event.findById(joinevent_id);
          const participantsPresent = findEvent.participants.length
          if (participantsPresent <= findEvent.maximumParticipantsAllowed) {
            findEvent.participants.push(participant)
            await findEvent.save()
            res.status(StatusCodes.OK).send(findEvent)
          }
          else
            res.status(StatusCodes.OK).send("Can't add new participant")
        }
      
        catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Method: joinEvent Class: EventController Error : ${error}`);
        }
      
      }
      
      
    async leaveEvent(req:Request, res:Response)  {
        const { leaveEvent_id, participant } = req.query;
      
        try {
          const leaveEvent = await Event.findById(leaveEvent_id);
          leaveEvent.participants.remove(participant)
          leaveEvent.leaveParticipants.push(participant)
          await leaveEvent.save()
          res.status(StatusCodes.OK).send(leaveEvent)
        }
      
        catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Method: leaveEvent Class: EventController Error : ${error}`);
        }
      
      }
         
     async getParticipantsOfEvent(req:Request, res:Response)  {
        const { _id } = req.query;
      
        try {
          const findParticipants = await Event.findById(_id );
          res.status(StatusCodes.OK).send(findParticipants.participants)
        }
      
        catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Method: getParticipantsOfEvent Class: EventController Error : ${error}`);
        }
      
      }
      
    }