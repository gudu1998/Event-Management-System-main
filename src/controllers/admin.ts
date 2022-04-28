import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/user";
import * as bcrypt from 'bcrypt'

export default class AdminController {
    async signupAdmin(req: Request, res: Response) {
        let { email, password } = req.body;
        const foundUser = await User.findOne({ "email": email });
        try {
            if (!!foundUser) {
                res.status(StatusCodes.UNAUTHORIZED).send({ message: "Email already exists" })
            }
            else {
                bcrypt.hash(password, 10, (err, hash) => {
                    password = hash
                    const newUser = new User({
                        email,
                        password
                    });

                    newUser.save()
                });
                res.status(StatusCodes.OK).send({ message: "You have successfully registered into the system" })
            }
        }
        catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Method: signupAdmin Class: AdminController Error : ${error}`);
        }
    }

    async signinAdmin(req: Request, res: Response) {

        const { email, password } = req.body
        try {
            const foundUser = await User.findOne({ "email": email });
            if (foundUser != null) {
                bcrypt.compare(password, foundUser.password, (err, result) => {
                    if (result) {
                        res.status(StatusCodes.OK).send({ message: "Successfully logged in" })
                    }
                    else {
                        res.status(StatusCodes.UNAUTHORIZED).send({ message: "Invalid password!" });
                    }
                });
            }
            else {
                res.status(StatusCodes.NOT_FOUND).send({ message: "User not found" })
            }
        }
        catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Method: signinAdmin Class: AdminController Error : ${error}`);
        }
    }

}
