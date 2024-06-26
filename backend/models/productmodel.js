const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim: true
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[8,"price cannomt exceed 8 character"]
    },
    ratings:{
        type: Number,
        default:0
    },
    images:[
        {
        public_id:{
        type:String,
        required: true
    },
    url:{
        type:String,
        required: true
    }
        }
],
category:{
    type:String,
    required:[true,"Please enter Product category"]
},
stock:{
    type:Number,
    required:[true,"Please enter product Stock"],
    maxLength:[4,"Stock cannont exceed 4 characters"],
    default:1
},
numofreviews:{
    type:Number,
    default:0,

},
reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }
],
user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,

},
createdAt:{
    type:Date,
    default:Date.now
}
})
module.exports = mongoose.model("Product",productSchema)