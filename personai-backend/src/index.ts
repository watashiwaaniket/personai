import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();
import envConfig from "./env.config";
import { userRouter } from "./routes/user.route";
import { userMiddleware } from "./middlewares/user";
import { contentModel, linkModel, userModel } from "./db";
import { random } from "./utils";
import cors from "cors";

declare module 'express-serve-static-core'{
    interface Request{
        userId?: string;
    }
}

const app = express();
app.use(express.json())
app.use(cors())

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

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await contentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const _id = req.body._id;

    await contentModel.deleteMany({
        _id,
        userId
    })

    res.json({
        message: "Content Deleted!" 
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if(share){
        const existingLink = await linkModel.findOne({
            userId : req.userId
        })

        if(existingLink){
            res.json({
                hash: existingLink.hash
            })
            return
        }
        const hash = random(10);
        await linkModel.create({
            userId: req.userId,
            hash: hash
        })

        res.json({
            hash
        })
    } else {
        await linkModel.deleteOne({
            userId: req.userId
        })
        res.json({
            message: 'Removed Link'
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await linkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await contentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await userModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })
})

async function main() {
    await mongoose.connect(envConfig.DatabaseConnectionString);
    app.listen(envConfig.ExpressPort, () => {
        console.log(`Server is listening on port ${envConfig.ExpressPort}`)
    })
}

main()