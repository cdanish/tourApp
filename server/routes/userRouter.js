import express from "express";
import {signIn, signUp}  from "../controllers/userController.js";

const router = express.Router();

//singupcontroller
router.post("/singup",signUp);

//singninController
router.post("/singnin",signIn);

export default router;