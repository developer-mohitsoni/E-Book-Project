import mongoose from "mongoose";
import { config } from "./config";

const connectDB =  () => {
    try {
        const mongoURL = config.databaseURL as string;
        mongoose.connect(mongoURL);

        const db = mongoose.connection;

        db.on("connected", () => {
            console.log("Connected to MongoDB Server");
        });
        db.on("error", (err) => {
            console.error("Error connecting to MongoDB Server", err);
        });
        db.on("disconnected", () => {
            console.log("Disconnected from MongoDB Server");
        });
    } catch (err) {
        console.error("Failed to connect to database.", err);

        process.exit(1);
    }
};

export default connectDB;
