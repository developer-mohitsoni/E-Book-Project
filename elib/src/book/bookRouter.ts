import express from "express";
import { createBook } from "./bookController";
import uploadMiddleware from "../middlewares/multer";

const bookRouter = express.Router();

// routes

bookRouter.post("/",uploadMiddleware ,createBook);

export default bookRouter;
