import { Request, Response } from "express";
import UserDao from "../daos/mongo/user.dao.ts";

const userDao = new UserDao();

export const registerUser = async (req: Request, res: Response) => {
    try {
        const newUser = await userDao.register(req.body);
        if (newUser) res.redirect("/login");
        else res.redirect("/error-register");
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.login(req.body);
        if (user) {
            // @ts-ignore
            req.session.email = email;
            res.redirect("/products");
        } else res.redirect("/error-login");
    } catch (error) {
        console.log(error);
    }
};
