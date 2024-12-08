import TourModel from "../models/tourModel.js";
import mongoose from "mongoose";


//creating tour
export const  createTour = async (req,res) =>{
    try{

        const tour = req.body;
        const newTour = new TourModel({
            ...tour,
            creator:req.userId,
            createdAt:new Date().toISOString()
        });

        await newTour.save();

        res.status(200).send({
            success:true,
            message:"Tour Created Successfully",
            newTour,
        })

    }catch(error){
        console.log(error);
        return res.status(404).send({
            success :false,
            message:"while crating Tour",
            error,

        });
    }
}

//get all tour

export const getTour = async(req,res)=>{
    try{
        const tours = await TourModel.find();

        return res.status(200).send({
            success :true,
            tours,
            
        })
        
    }catch(error){
        return res.status(404).send({
            success:false,
            message:"while getting tour",
            error,
        })
    }
}

//get single tour
export const getSingleTour = async(req,res)=>{
    try{
        const {id} = req.params;
        const tours = await TourModel.findById(id);

        return res.status(200).send({
            success :true,
            tours,
            
        })
        
    }catch(error){
        return res.status(404).send({
            success:false,
            message:"while getting single tour",
            error,
        })
    }
}


///get tour by login user
export const getSingleTourByuser = async(req,res)=>{
    try{
        const {id} = req.params;
       // console.log(id);

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({
                success :false,
                message:"user Doest not exits",
                
            })
        }

        const tours = await TourModel.find({creator  : id });

        return res.status(200).send({
            success :true,
            message:"user Tour",
            tours,
            
        })
        
    }catch(error){
        return res.status(404).send({
            success:false,
            message:"while getting By user single tour",
            error,
        })
    }
}


//delete tour

export const deleteTour = async(req,res) =>{
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({
                success :false,
                message:"Tour Doest not exits",
                
            })
        }

        await TourModel.findByIdAndDelete(id);
        return res.status(200).send({
            success :true,
            message:"tour deleted",
            
        })

    }catch(error){
        return res.status(404).send({
            success:false,
            message:"error while deleting tour",
            error,
        })
    }
}


//updateTour

export const updatetours = async(req,res) =>{
    try{
        const {id} = req.params;

        const {title,description,creator,imageFile,tags} = req.body;


        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({
                success :false,
                message:"Tour Doest not exits",
                
            })
        }

        const updatedTour ={
            creator,
            title,
            description,
            tags,
            imageFile,
            _id:id,

        }

        await TourModel.findByIdAndUpdate(id,updatedTour,{new:true})
        return res.status(200).send({
            success :true,
            message:"tour updated",

            
        })

    }catch(error){
        return res.status(404).send({
            success:false,
            message:"error while deleting tour",
            error,
        })
    }
}
