import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "./userModel";
import bcrypt, { genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
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

    // password -> hash
    const salt = await genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name: name,
        email: email,
        password: hashPassword,
    });

    // Token generation JWT
    const token = sign(
        {
            sub: newUser._id,
        },
        config.jwtSecret as string,
        {
            expiresIn: "7d",
        }
    );
    // Process
    // Response
    res.json({
        accessToken: token,
    });
};

export { createUser };
