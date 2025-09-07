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
import { GoogleGenAI } from "@google/genai";

declare module 'express-serve-static-core'{
    interface Request{
        userId?: string;
    }
}

const app = express();
app.use(express.json())

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173', // Vite dev server
      'http://localhost:3000', // Alternative dev port
      'http://127.0.0.1:5173', // Alternative localhost
      'http://127.0.0.1:3000', // Alternative localhost
    ];
    
    // Allow any Vercel app domain
    if (origin.includes('vercel.app') || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token', 'x-requested-with'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  optionsSuccessStatus: 200,
  preflightContinue: false
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token, x-requested-with');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    cors: 'enabled'
  });
});

app.use('/api/v1/user', userRouter);

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title, tags, dateAdded} = req.body;
    const ai = new GoogleGenAI({
        apiKey: envConfig.GeminiApiKey
    })

    async function contextCall(link : string, type : string) {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${type === 'youtube' ? `find out the transcript of the youtube video ${link}` :
                type === 'twitter' ? '' :
                type === 'note' ? `read through the note, and find suitable context for it, relevant information - ${link}` :
                type === 'article' ? `look through the link given and find out the context of the article/blog and write it in less than 300words, clear and concise - ${link}` :
                ''
            }`
        });
        return response.text
    }

    try {
        const context = await contextCall(link, type);

        await contentModel.create({
        link,
        type,
        title,
        userId: req.userId,
        tags,
        dateAdded,
        context
        });

        res.json({
        message: "Content added"
        });
    } catch (err) {
        console.error("Error while generating content context:", err);
        res.status(500).json({ error: "Failed to add content" });
    }
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