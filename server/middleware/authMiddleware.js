import jwt from "jsonwebtoken";

const secret= "test";

const authMiddleWare = async(req,res,next) =>{

    try{

        // Check if the authorization header exists
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];

        //console.log(token);
        
        const isCutomAuth = token.length < 500;

        let decodedData;

        if(token && isCutomAuth){
            decodedData = jwt.verify(token,secret);
            req.userId = decodedData?.id;
            //console.log(req.userId);
        }
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).json({ message: "Unauthorized" });
    }

}

export default authMiddleWare;