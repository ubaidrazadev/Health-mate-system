import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connect successfully');
    } catch (error) {
        console.log('mongoDB connection error' ,error);
    }
}

export default connectDB;