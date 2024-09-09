import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import bcrypt, { genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";
import userModel from "./userModel";

// Create User
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        res.status(201).json({
            accessToken: token,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return next(createHttpError(500, "Error while signing the jwt token"));
    }
};

// Login User
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(createHttpError(400, "All fields are required"));
    }

    //todo: wrap in try catch
    const user = await userModel.findOne({
        email: email,
    });

    if (!user) {
        return next(createHttpError(401, "User not found."));
    }

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(
                createHttpError(401, "Username or password is incorrect..")
            );
        }

        // todo: handle errors

        // create access token

        const token = sign({ sub: user._id }, config.jwtSecret as string, {
            expiresIn: "7d",
            algorithm: "HS256",
        });

        return res.json({ accessToken: token });
    }
};

export { createUser, loginUser };
