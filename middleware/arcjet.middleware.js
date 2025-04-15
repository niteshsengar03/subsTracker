import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 }); // Deduct 5 tokens from the bucket
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) return res.status(429).json({ error: "Too Many Requests" });
            else if (decision.reason.isBot())  return res.status(401).json({ error: "No bots allowed"});
            else res.status(403).json({error:"Forbiden"});
        }
        next();
    }
    catch (err) {
        console.log(`Error from arcjet ${err}`)
        next(err);
    }
} 

export default arcjetMiddleware;