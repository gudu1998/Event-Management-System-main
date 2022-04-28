import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import multer = require("multer")
import path = require("path")
import Profile from "../models/profile"

export default class ProfileController{

async createProfile(req:Request, res:Response) {
    let { firstName, lastName, gender, dateOfBirth } = req.body;
  
    try {
      const newProfile = new Profile({
        firstName,
        lastName,
        gender,
        dateOfBirth
      });
  
      newProfile.save()
  
      res.json("Profile Created")
    }
  
    catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Method: createProfile Class: ProfileController Error : ${error}`);
    }
  
  }

  async viewProfile(req:Request, res:Response) {
    let { profile_id } = req.query;
  
    try {
      const viewProfile = await Profile.findById(profile_id);
      if(!!viewProfile)
      res.status(StatusCodes.OK).send(viewProfile)
      else
      res.status(StatusCodes.NOT_FOUND).send({ message: "Profile not found" })
    }
  
    catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Method: viewProfile Class: ProfileController Error : ${error}`);
    }
  
  }
  
  async editProfile(req:Request, res:Response)  {
    let { profile_id,firstName,lastName,gender,dateOfBirth } = req.query;
  
    try {
 
     await Profile.updateMany({ "_id": profile_id},
      {"firstName":firstName,"lastName":lastName,"gender":gender,"dateOfBirth":dateOfBirth,updatedAt:Date.now()});
    
      const getProfile = await Profile.findById(profile_id)
  
     res.status(StatusCodes.OK).send(getProfile)

    }
  
    catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Method: editProfile Class: ProfileController Error : ${error}`);
    }

}
  
}

