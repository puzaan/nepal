import catchAsync from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


// create middleware which check if user has sent token, is it expire or not and valid.


export const protect = catchAsync(async(req, res, next)=>{
    let token;
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded =jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password")
            next();
        }catch(err){
            console.log(err) 
            res.status(401);
            throw new Error('Not Authorized! Token Feild ')  
        }
    }
    next();
})