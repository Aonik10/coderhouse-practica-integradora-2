import { NextFunction, Request, Response } from "express";
import { DatabaseError, NotFoundError } from "../utils/errors.ts";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    console.log(error instanceof NotFoundError);
    if (error instanceof NotFoundError) {
        return res.status(404).json({ error: error.name, msg: error.message });
    }
    if (error instanceof DatabaseError) {
        return res.status(400).json({ error: error.name, msg: error.message });
    }
    return res.status(500).json({ error: "UNHANDLED_ERROR", message: error.message });
};
