import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();
import envConfig from "./env.config";
import { userRouter } from "./routes/user.route";


const app = express();

app.use('/api/v1/user', userRouter);

// app.post("/api/v1/content", (req, res) => {

// })

// app.get("/api/v1/content", (req, res) => {

// })

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