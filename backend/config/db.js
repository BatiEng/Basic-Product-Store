import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const _ = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to the db");
  } catch (err) {
    console.log("error occur while connecting database");
    process.exit(1);
  }
};
