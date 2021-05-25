
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