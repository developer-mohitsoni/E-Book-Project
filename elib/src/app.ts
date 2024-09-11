import express from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
import { config } from "./config/config";

const app = express();

app.use(
    cors({
        origin: config.frontendDomain,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        
    })
);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

// Routes

// app.use();

app.get("/", (req, res, next) => {
    res.send("Welcome to elib apis");
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
