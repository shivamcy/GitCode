const jwt=require('jsonwebtoken');
const authenticateToken=(req,res,next) => {
    console.log("In the authentication")
    const authHeader=req.headers['auth-token'];
    // console.log(authHeader);
    // const token=authHeader&&authHeader.split(' ')[1]; // Extract token from Authorization header
    // console.log(token);
    const token=authHeader;
    // console.log(token)
    if (!token) {
        return res.sendStatus(401); // Unauthorized if token is missing
    }

    jwt.verify(token,process.env['SIGNATURE'],(err,decodedToken) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        // console.log(decodedToken.user.id);
        console.log("Authentication Done!!");
        req.userId=decodedToken.user.id; // Store user ID from token in request object
        next();
    });
};

module.exports=authenticateToken;