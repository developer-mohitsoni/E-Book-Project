import express from "express";
import { createBook, listBooks, updateBook } from "./bookController";
import uploadMiddleware from "../middlewares/multer";
import authMiddleware from "../middlewares/authenticate";

const bookRouter = express.Router();

// routes

bookRouter.post("/", authMiddleware, uploadMiddleware, createBook);
bookRouter.put("/:bookId", authMiddleware, uploadMiddleware, updateBook);
bookRouter.get('/', listBooks)

export default bookRouter;
