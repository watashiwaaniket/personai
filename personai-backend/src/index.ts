import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();
import envConfig from "./env.config";
import { userRouter } from "./routes/user.route";
import { userMiddleware } from "./middlewares/user";
import { contentModel } from "./db";

declare module 'express-serve-static-core'{
    interface Request{
        userId?: string;
    }
}

const app = express();
app.use(express.json())

app.use('/api/v1/user', userRouter);

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title, tags} = req.body;
    await contentModel.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
})

app.get("/api/v1/content", (req, res) => {
    
})

// app.delete("/api/v1/content", (req, res) => {

// })

// app.post("/api/v1/brain/share", (req, res) => {

// })

// app.get("/api/v1/brain/:shareLink", (req, res) => {

// })

async function main() {
    await mongoose.connect(envConfig.DatabaseConnectionString);
    app.listen(envConfig.ExpressPort, () => {
        console.log(`Server is listening on port ${envConfig.ExpressPort}`)
    })
}

main()