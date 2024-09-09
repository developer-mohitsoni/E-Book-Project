import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";
import createHttpError from "http-errors";

export interface AuthRequest extends Request {
    userId: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");

    if (authHeader === null || authHeader === undefined) {
        return next(createHttpError(401, "Authorization token is required."));
    }

    try {
        const token = authHeader.split(" ")[1];

        const decoded = verify(token, config.jwtSecret as string);

        // console.log("decoded", decoded);

        const _req = req as AuthRequest;

        _req.userId = decoded.sub as string;

        next();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return next(createHttpError(401, "Token expired."));
    }
};

export default authMiddleware;
