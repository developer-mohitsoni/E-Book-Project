import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "./userModel";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    // Validation
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required.");

        return next(error);
    }
    // Database call
    const user = await User.findOne({
        email: email,
    });

    if (user) {
        const error = createHttpError(
            400,
            "User already exist with this email."
        );

        return next(error);
    }
    // Process
    // Response
    res.json({
        message: "User Registered Successfully",
    });
};

export { createUser };
