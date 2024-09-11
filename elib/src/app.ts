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
        origin: config.frontendDomain || "*", // Allow specific frontend domain
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Enable credentials (cookies, etc.)
        // preflightContinue: true, // Enable preflight requests
        // optionsSuccessStatus: 200, // HTTP status code for successful preflight requests
    })
);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

// Handle Preflight (OPTIONS) Requests
app.options("*", cors()); // Preflight requests handled by CORS

// Routes
app.get("/", (req, res, next) => {
    res.send("Welcome to elib apis");
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
