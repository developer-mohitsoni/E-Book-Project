import express from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
import { config } from "./config/config";

const app = express();

// CORS Configuration
app.use(
    cors({
        origin: "https://e-book-client-roan.vercel.app", // Use frontend domain from config
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight
        allowedHeaders: ["Content-Type", "Authorization"], // Match request headers
        credentials: true, // Enable credentials (cookies, etc.)
        optionsSuccessStatus: 200, // HTTP status code for preflight, 204 (No Content) is more common
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle Preflight (OPTIONS) Requests Globally
app.options("*", cors()); // Automatically respond to preflight with CORS headers

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to elib apis");
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
