const jwt = require('jsonwebtoken');

const requireSignIn = (req, res, next) => {
    try {
        // 1. Get the full Authorization header
        const authHeader = req.headers.authorization;

        // 2. Check if the header exists
        if (!authHeader) {
            return res.status(401).send({
                message: "No token provided: Authorization header missing."
            });
        }

        // 3. Extract the token by splitting the "Bearer " prefix
        // It should be in the format: "Bearer <YOUR_TOKEN>"
        const token = authHeader.split(' ')[1]; 

        // 4. Check if the token was successfully extracted
        if (!token) {
            return res.status(401).send({
                message: "Invalid token format: Token not found after 'Bearer'."
            });
        }

        // 5. Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 6. Attach the decoded user information to req.user
        req.user = decoded;
        
        // 7. Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle specific JWT errors for more informative messages
        console.error("Authentication Error:", error); // Log the actual error for debugging

        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({
                message: "Token expired, please log in again."
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({
                message: "Invalid token: Authentication failed."
            });
        }
        
        // Generic error for other issues
        res.status(401).send({
            message: "Authentication failed due to an unexpected error."
        });
    }
};

module.exports = requireSignIn;