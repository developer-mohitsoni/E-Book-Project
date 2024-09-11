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
        origin: config.frontendDomain, // Use the frontend domain from config
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight
        allowedHeaders: ["Content-Type", "Authorization"], // Ensure these match the request headers
        credentials: true, // Enable credentials (cookies, etc.)
        optionsSuccessStatus: 200, // HTTP status code for successful preflight requests
    })
);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

// Handle Preflight (OPTIONS) Requests
app.options("*", (req, res) => {
    res.sendStatus(200); // Explicitly respond with 200 for preflight requests
});

// Routes
app.get("/", (req, res, next) => {
    res.send("Welcome to elib apis");
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
