import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";

const secret = "test";


///singup
export const signUp = async (req,res)=>{
    try{

        const {email,password,firstname,lastname} = req.body;

        const oldUser = await userModel.findOne({email});

        if(oldUser){
            return res.status(400).send({
                success:false,
                message:"already available user",
                oldUser,
            });
        }


        const hashpassword = await bcrypt.hash(password,10);

        const result = await userModel.create({

            email,
            password:hashpassword,
            name:`${firstname} ${lastname}`
        });

        const token = jwt.sign({
            email:result.email,
            id:result._id
        },secret,{
            expiresIn:"1h",
        });

        return res.status(201).send({

            success: true,
            message:"user Created",
            result,
            token

        });


        
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while singUp",
            error,
        });
    }
}


// export const test = async (req,res)=>{
//     return res.send("test router");
// } 


//singn
export const signIn = async (req,res)=>{
    try{

        const {email,password} = req.body;
       // console.log(email,password);
        const oldUser = await userModel.findOne({email});
        if(!oldUser){

            return res.status(400).send({
                success:false,
                message:"User is not avaiable with mail",
                oldUser,
            });

        }

        const ispasswordCorrect = await bcrypt.compare(password,oldUser.password);

        if(!ispasswordCorrect){
            return res.status(400).send({
                success:false,
                message:"User is not avaiable with password",
                oldUser,
            });
        }


        const token = jwt.sign({email:oldUser.email,id:oldUser._id},secret,{
            expiresIn:"1h"
        });

        return res.status(200).send({
            success:true,
            message:"logged in successfully",
            result:oldUser,
            token,
            

        });



    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while singnIn",
            error,
        });

    }
}