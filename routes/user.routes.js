import { Router } from "express";

const userRouter = Router();

// get all users
userRouter.get('/',(req,res)=>{});

//get user detail
userRouter.get('/:id',(req,res)=>{});

//create a new user
userRouter.post('/',(req,res)=>{});

//update a user
userRouter.put('/:id',(req,res)=>{});

//delete a user
userRouter.delete('/:id',(req,res)=>{});

export default userRouter;