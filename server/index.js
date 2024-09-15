import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'
import postRoutes from './routes/postRoute.js'
import commentRoutes from './routes/commentRoute.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'https://blog-it-nine.vercel.app', // Allow your frontend URL
    credentials: true, // Allow credentials (if you're using cookies or sessions)
}));

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('MongoDB is connected');
}).catch((err)=>{
    console.log(err);
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment',commentRoutes);

// middleware for error handling
app.get('/', (req, res) => {
    res.send('Welcome to the AP NEW');
  });

app.use((err,req,res,next)=>{
 const statusCode = err.statusCode || 500;
 const message = err.message || 'Internal server error';

 res.status(statusCode).json({
    success:false,
    statusCode,
    message,
 })

})


app.listen(3000,()=>{
console.log("Sever running on 3000")

})