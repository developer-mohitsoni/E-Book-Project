import express from "express";

const app = express();

// Routes

// app.use();

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to elib apis",
    });
});

export default app;
