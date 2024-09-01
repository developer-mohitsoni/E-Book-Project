import express from "express";
import {
    createBook,
    deleteBook,
    getSingleBook,
    listBooks,
    updateBook,
} from "./bookController";
import uploadMiddleware from "../middlewares/multer";
import authMiddleware from "../middlewares/authenticate";

const bookRouter = express.Router();

// routes

bookRouter.post("/", authMiddleware, uploadMiddleware, createBook);
bookRouter.put("/:bookId", authMiddleware, uploadMiddleware, updateBook);
bookRouter.get("/", listBooks);
bookRouter.get("/:bookId", getSingleBook);
bookRouter.delete("/:bookId", authMiddleware, deleteBook);

export default bookRouter;
