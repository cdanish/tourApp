import mongoose from "mongoose";

const ConnectDB = async () =>{
    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected DB");

    }catch(error){
        console.log("Error in mongo Connect"+error);
    }
}

export default ConnectDB;