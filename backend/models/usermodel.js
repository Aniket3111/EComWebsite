const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your Name"],
        maxlength:[30,"Name entered cannont exceed 30 chatacter"],
        minlength:[4,"name should have more than 4 character"]
    },
    email:{
        type:String,
        required:[true,"Please enter your valid email"],
        unique:true,
        validate:[validator.isEmail,"please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minlength:[8,"password should be greater than 8 character"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required: true
        },
        url:{
            type:String,
            required: true
        }

    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken: String,
    resetPasswordExpired:Date,
});
userschema.pre("save",async function(next){
    if(this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
});

//JWT TOKEN
userschema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRECT,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};
//Compare Password
userschema.methods.comparePassword= async function(enteredpassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("User",userschema)