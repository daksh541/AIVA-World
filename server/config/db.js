import mongoose from 'mongoose';

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Mongo connection error', error);
    throw error;
  }
};

export default connectDB;
