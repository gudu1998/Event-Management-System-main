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
    }