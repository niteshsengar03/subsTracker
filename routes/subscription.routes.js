import { Router } from "express";
import { syncIndexes } from "mongoose";

const subscriptionRouter = Router();

// get all subscription
subscriptionRouter.get('/',(req,res)=>{})
// get subscription details
subscriptionRouter.get('/:id',(req,res)=>{})
// creating a subscription
subscriptionRouter.post('/',(req,res)=>{})
// update a subscription
subscriptionRouter.put('/:id',(req,res)=>{})
// delete  a subscription
subscriptionRouter.delete('/:id',(req,res)=>{})



// get subscriptions of a specific user
subscriptionRouter.get('/user/:id',(req,res)=>{})

// cancel subscription 
subscriptionRouter.put('/cancel/:id',(req,res)=>{})

// get upcoming renewals
subscriptionRouter.get('/upcoming-renewals',(req,res)=>{})




export default subscriptionRouter;