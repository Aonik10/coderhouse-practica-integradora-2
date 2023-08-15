import passport, { DoneCallback } from "passport";
import { IStrategyOptionsWithRequest, Strategy as LocalStrategy } from "passport-local";
import UserDao from "../daos/mongo/user.dao.ts";
import { Request } from "express";
import { IUserCreated } from "../daos/mongo/models/user.model.ts";

const userDao = new UserDao();

const strategyOptions: IStrategyOptionsWithRequest = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
};

const register = async (req: Request, done: DoneCallback) => {
    const user = await userDao.getByEmail(req.body.email);
    if (user) return done(null, false);
    const newUser = await userDao.register(req.body);
    return done(null, newUser);
};

const login = async (req: Request, done: DoneCallback) => {
    const userLogin = await userDao.login(req.body);
    if (!userLogin) return done(null, false);
    return done(null, userLogin);
};

// weird typescript error, strategyOptions matches the type definition of the class LocalStrategy's first param

// @ts-ignore
const registerStrategy = new LocalStrategy(strategyOptions, register);
// @ts-ignore
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user: Express.User, done: DoneCallback) => {
    done(null, user);
});

passport.deserializeUser(async (id: string, done: DoneCallback) => {
    const user = await userDao.getById(id);
    return done(null, user);
});
