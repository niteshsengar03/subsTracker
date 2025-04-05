const errorMiddleware = (err,req,res,next)=>{
    try{
        // want to create a shallow copy
        let error = {...err};

        // Explicitly copy the message property because it is non-enumerable in the Error object
        // The spread operator {...err} does not copy non-enumerable properties like 'message' or 'stack'
        error.message = err.message;

        console.log(err);

        if(err.name === 'CastError'){
            const message = 'Resource not found';
            error = new Error (message);
            error.statusCode = 404;
        }

        if(err.code === 11000){
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val=> val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }
        res.status(error.statusCode || 500).json({success:false,error:error.message||'Server Error'});

    }catch(error){
        // Pass any unexpected errors to the next middleware
        next(error);
    }

}

export default errorMiddleware;