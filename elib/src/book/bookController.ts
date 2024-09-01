import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

const createBook = (req: Request, res: Response, next: NextFunction) => {
    res.json({});
};

export { createBook };
