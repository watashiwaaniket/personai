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
exports.userRouter = void 0;
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const db_1 = require("../db");
const env_config_1 = __importDefault(require("../env.config"));
//TODO - setup zod validation and try catch blocks so that the server dont break
userRouter.post('/signup', async function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 5);
    await db_1.userModel.create({
        username: username,
        email: email,
        password: hashedPassword
    });
    res.json({
        message: "You are signed up!"
    });
});
userRouter.post('/login', async function (req, res) {
    const { email, password } = req.body;
    const response = await db_1.userModel.findOne({
        email
    });
    if (response?.password && bcrypt.compareSync(password, response?.password.toString())) {
        const token = jsonwebtoken_1.default.sign({
            id: response._id.toString()
        }, env_config_1.default.JwtUserPassword);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect Creds"
        });
    }
});
