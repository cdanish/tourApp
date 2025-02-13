import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:false,
    },
    googleId:{
        type:String,
        required:false,
    },
    id:{
        type:String,
    }

},{
    timestamps:true,
});


export default mongoose.model("user",userSchema);

