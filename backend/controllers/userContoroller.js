
import User from '../models/userModel.js'
import catchAsync from "express-async-handler"
import generateToken from "../utils/generateToken.js"

/**
 * @dec auth user and get token
 * @rout post/api/users/log
 * @acces publiv
 */


export const authUser = catchAsync(async(req, res) => {


    const {email, password} = req.body;

   // console.log(req.body);
const user = await User.findOne({email});

if(user && (await user.matchPassword(password))){
    //if user and passwor is matched
    //console.log('user exist in database')
    return res.json({
        _id: user._id,
        name:user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
    })

}else{
res.status(401);
throw new Error('Invalid Email or password');
    //console.log('user doesnot exit in database')
}
})

/**
 * dec get user profile
 * rout get/api/users/profile
 * acces private
 */

export const getUserProfile = catchAsync(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
        });
    }else{
        res.status(404);
        throw new Error("User belong to this token no longer exit")
    }
});


/**
 * desc register a new user
 * rout post/api/users
 * access public
 */


export const registerUser = catchAsync(async(req, res) =>{
    const {name, email, password} = req.body;

    const userExit = await User.findOne({email});

    if(userExit){
        res.status(404);
        throw new Error('User alred exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if(user){
        res.status(201);
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error("Invalid User data");
    }
})