import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
const authorise = (req,res,next)=>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
             token = req.headers.authorization.split(' ')[1];
        }
        const  decoded = jwt.verify(token,JWT_SECRET);
        req.userId =  decoded.userId;
        next();

    }catch(err){
        return res.status(401).json({message:"Not authorise",error:err.message});
    }
}
export default authorise;