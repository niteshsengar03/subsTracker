import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorise from "../middleware/auth.middleware.js";

const userRouter = Router();

// get all users
userRouter.get('/',getUsers);


//get user detail
userRouter.get('/user',authorise,getUser);

//create a new user
userRouter.post('/',(req,res)=>{});

//update a user
userRouter.put('/:id',(req,res)=>{});

//delete a user
userRouter.delete('/:id',(req,res)=>{});

export default userRouter;