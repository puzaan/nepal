import mongoose from 'mongoose';
import bscrypt from 'bcryptjs'

const userSchema = mongoose.Schema ({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
},{
    timestamp: true
}
);

userSchema.pre("save", async function  (next) {
if(!this.isModified('password')){
    next();
}

const salt = await bscrypt.genSalt(10);
this.password = await bscrypt.hash(this.password, salt);
next();
}
)

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bscrypt.compare(enteredPassword, this.password);
}


const User = mongoose.model("User", userSchema);
export default User;