import express from "express";
import { createBook } from "./bookController";
import uploadMiddleware from "../middlewares/multer";
import authMiddleware from "../middlewares/authenticate";

const bookRouter = express.Router();

// routes

bookRouter.post("/",authMiddleware,uploadMiddleware ,createBook);

export default bookRouter;
