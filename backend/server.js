const express=require('express')
const mongoose=require('mongoose');
const userRouter=require('./router/userRouter');
const DataRouter=require("./router/DataRouter")
const app =express();
const cors=require('cors')
require('dotenv').config();

app.use(cors({
  origin: "https://adidata.netlify.app", // your Netlify URL without trailing slash
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('server is running on railway')
})

app.use('/api/v1/user',userRouter);
app.use('/api/v1/data',DataRouter)  



const connect=async()=>{
    try {
        const con=await mongoose.connect(process.env.MONGODB_URL);
        if (con) {
            console.log('db is connected')
        }
    } catch (err) {
        console.log('error in  connecting DB',err)
    }
}
connect();

// mongoose.connect(process.env.MONGODB_URL)
// .then(()=>console.log('db is connected'))
// .catch((err)=>console.error('error in  connecting DB',err));

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('server is running on port',PORT);
})