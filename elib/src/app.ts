import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

// Routes

// app.use();

app.get("/", (req, res, next) => {
    res.json({
        message: "Welcome to elib apis",
    });
});

app.use("/api/users", userRouter);
app.use("/api/books",bookRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
