"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../env.config"));
// @ts-ignore
const userMiddleware = (req, res, next) => {
    const token = req.headers.token;
    if (typeof token !== 'string') {
        return res.status(403).json({
            message: 'You are not signed in!'
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.default.JwtUserPassword);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(403).json({
            message: 'Invalid Token!'
        });
    }
};
exports.userMiddleware = userMiddleware;
