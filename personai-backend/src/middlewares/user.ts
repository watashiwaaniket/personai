import jwt from 'jsonwebtoken';
import envConfig from '../env.config';
import { RequestHandler } from 'express';

// @ts-ignore
const userMiddleware: RequestHandler = (req, res, next) => {
    const token = req.headers.token;

    if(typeof token !== 'string'){
        return res.status(403).json({
            message: 'You are not signed in!'
        })        
    }

    try {
        const decoded = jwt.verify(token, envConfig.JwtUserPassword) as jwt.JwtPayload;
        (req as any).userId = decoded.id;
        next()
    } catch(err){
        return res.status(403).json({
            message: 'Invalid Token!'
        })
    }
} 

export { userMiddleware }