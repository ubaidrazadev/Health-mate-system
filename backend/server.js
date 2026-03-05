import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './DataBase/db.js';
import userRoutes from './Routes/UserRoutes/userRouter.js';
import router from './Routes/ReportRoute/reportRoute.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/reports', router)
app.get("/health",(req,res)=>{
    res.send("backend is running")
})
app.get("/",(req,res)=>{
    res.send("backend is running")
})
const PORT = process.env.PORT

connectDB().then(() => {
    app.listen(PORT, ()=> {
        console.log(`Server is running on Port ${PORT}`)
    })
})