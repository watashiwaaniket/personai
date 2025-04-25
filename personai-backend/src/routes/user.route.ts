import { Router } from "express";
const userRouter = Router();
import jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { userModel } from '../db';
import envConfig from "../env.config";

//TODO - setup zod validation and try catch blocks so that the server dont break

userRouter.post('/signup', async function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword  = bcrypt.hashSync(password, 5);

    await userModel.create({
        username: username,
        email: email,
        password: hashedPassword
    });

    res.json({
        message: "You are signed up!"
    })
})

userRouter.post('/login', async function (req, res) {
    const { email, password } = req.body;
    const response = await userModel.findOne({
        email
    })   

    if(response?.password && bcrypt.compareSync(password, response?.password.toString())){
        const token = jwt.sign({
            id: response._id.toString()
        }, envConfig.JwtUserPassword);

        res.json({
            token
        })
    }else{
        res.status(403).json({
            message: "Incorrect Creds"
        })
    }
})

export { userRouter }