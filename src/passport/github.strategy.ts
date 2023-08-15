import { Strategy as GithubStrategy } from "passport-github2";
import passport, { DoneCallback } from "passport";
import UserDao from "../daos/mongo/user.dao.ts";

const userDao = new UserDao();

//of course this should be in a .env file included in .gitignore
const strategyOptions = {
    clientID: "Iv1.ae000be2437fb5e0",
    clientSecret: "2a2b63398aa597e0e77a359983a86f744ea77542",
    callbackURL: "http://localhost:8080/users/github",
};

const registerOrLogin = async (accessToken: string, refreshToken: string, profile: any, done: DoneCallback) => {
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await userDao.getByEmail(email);
    if (user) return done(null, user);
    const newUser = await userDao.register({
        first_name: profile._json.name.split(" ")[0],
        last_name: profile._json.name.split(" ")[1],
        email,
        password: "",
        isGithub: true,
    });
    return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
