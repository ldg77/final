import mongoose from "mongoose";
import Layout from "@/model/Layout";
import User from "@/model/User";
const connectMongo = async () => mongoose.connect(process.env.MONGO_URI!);
mongoose.set("strictQuery", false);
export default connectMongo;
