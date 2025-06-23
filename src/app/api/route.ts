import mongoose from "mongoose";

// Cache the database connection
let isConnected: boolean = false;

export const connectDb = async():Promise<void> =>{
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }
    try {
         
        console.log("db connection",process.env.MONGODB_URI);
        const db = await mongoose.connect(process.env.MONGODB_URI as string )
        isConnected = !!db.connections[0].readyState;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        isConnected = false;
    }
} 