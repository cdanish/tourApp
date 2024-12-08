import express from "express";
import {createTour,deleteTour,getSingleTour,getSingleTourByuser,getTour, updatetours} from "../controllers/tourController.js";
import authMiddleWare from "../middleware/authMiddleware.js";

const router = express.Router();

//createtour router
router.post("/ctour",authMiddleWare,createTour);

//gettingtour router
router.get("/gtour",getTour);

//getting single router
router.get("/gtour/:id",getSingleTour);

//getting usertour
router.get("/userTours/:id",authMiddleWare,getSingleTourByuser);

//deleteTour
router.delete("/tourDelete/:id",authMiddleWare,deleteTour);

//updateTour
router.patch("/tourUpdate/:id",authMiddleWare,updatetours);



export default router;

