"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const env_config_1 = __importDefault(require("./env.config"));
const user_route_1 = require("./routes/user.route");
const user_1 = require("./middlewares/user");
const db_1 = require("./db");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const genai_1 = require("@google/genai");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/user', user_route_1.userRouter);
app.post("/api/v1/content", user_1.userMiddleware, async (req, res) => {
    const { link, type, title, tags, dateAdded } = req.body;
    const ai = new genai_1.GoogleGenAI({
        apiKey: env_config_1.default.GeminiApiKey
    });
    async function contextCall(link, type) {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${type === 'youtube' ? `find out the transcript of the youtube video ${link}` :
                type === 'twitter' ? '' :
                    type === 'note' ? `read through the note, and find suitable context for it, relevant information - ${link}` :
                        type === 'article' ? `look through the link given and find out the context of the article/blog and write it in less than 300words, clear and concise - ${link}` :
                            ''}`
        });
        return response.text;
    }
    try {
        const context = await contextCall(link, type);
        await db_1.contentModel.create({
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
    }
    catch (err) {
        console.error("Error while generating content context:", err);
        res.status(500).json({ error: "Failed to add content" });
    }
});
app.get("/api/v1/content", user_1.userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await db_1.contentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
});
app.delete("/api/v1/content", user_1.userMiddleware, async (req, res) => {
    const userId = req.userId;
    const _id = req.body._id;
    await db_1.contentModel.deleteMany({
        _id,
        userId
    });
    res.json({
        message: "Content Deleted!"
    });
});
app.post("/api/v1/brain/share", user_1.userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await db_1.linkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        await db_1.linkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        await db_1.linkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: 'Removed Link'
        });
    }
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await db_1.linkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    // userId
    const content = await db_1.contentModel.find({
        userId: link.userId
    });
    console.log(link);
    const user = await db_1.userModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
});
async function main() {
    await mongoose_1.default.connect(env_config_1.default.DatabaseConnectionString);
    app.listen(env_config_1.default.ExpressPort, () => {
        console.log(`Server is listening on port ${env_config_1.default.ExpressPort}`);
    });
}
main();
