import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import bcrypt, { genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";
import userModel from "./userModel";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    // Validation
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required.");

        return next(error);
    }
    // Database call
    try {
        const user = await userModel.findOne({
            email: email,
        });

        if (user) {
            const error = createHttpError(
                400,
                "User already exist with this email."
            );

            return next(error);
        }
    } catch (err) {
        return next(createHttpError(500, "Error while getting user"));
    }

    // password -> hash
    const salt = await genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let newUser: User;

    try {
        newUser = await userModel.create({
            name: name,
            email: email,
            password: hashPassword,
        });
    } catch (err) {
        return next(createHttpError(500, "Error while creating user"));
    }

    try {
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
        // Response
        res.json({
            accessToken: token,
        });
    } catch (err) {
        return next(createHttpError(500, "Error while signing the jwt token"));
    }
};

export { createUser };
