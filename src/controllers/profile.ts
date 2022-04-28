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
  
  
}

