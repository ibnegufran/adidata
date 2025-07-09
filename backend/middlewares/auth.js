const jwt=require('jsonwebtoken');


const requireSignIn=(req,res,next)=>{
try {
    const token =req.headers.authorization;

    if(!token){
        return req.status(401).send({
            message:"no token provided"
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;


//     📌 1. const decoded = jwt.verify(token, process.env.JWT_SECRET);
// ✅ Kaam:
// Ye JWT token ko verify karta hai using your secret key.

// Agar token valid hai, to wo token ke andar ka data (userId, email, etc.) return karta hai.

// Agar token fake ya expired ho to error throw karta hai.

// 🔍 Example:
// js
// Copy
// Edit
// const token = "eyJhbGciOiJIUzI1NiIsInR...";
// const decoded = jwt.verify(token, "mySecret123");
// console.log(decoded);
// // Output: { userId: '6482c...', email: 'abc@gmail.com', iat: ..., exp: ... }
// 📌 2. req.user = decoded;
// ✅ Kaam:
// Ye decoded user info ko request object (req) me attach karta hai.

// Taaki aage ke route handlers me tum directly req.user ka use kar sako.

// 🔍 Use Case:
// js
// Copy
// Edit
// router.get("/dashboard", requireSignIn, (req, res) => {
//   res.send(`Welcome, your email is ${req.user.email}`);
// });
// Yani req.user me ab poora user data available hai — bina dobara database query ke.
    
    next();
} catch (error) {
    res.status(401).send({
        message:"invalid or expired token"
    })
}
}

module.exports=requireSignIn;