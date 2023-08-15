import { NotFoundError } from "../../utils/errors.ts";
import { IUser, UserModel } from "./models/user.model.ts";
import { compareSync, genSaltSync, hashSync } from "bcrypt";

interface UserLogin {
    email: string;
    password: string;
}

export default class UserDao {
    async register(user: Partial<IUser>) {
        const { email, password } = user;
        if (!email || !password) throw new Error("Please, provide credentials");
        const existUser = await UserModel.findOne({ email });
        if (!existUser) {
            if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                const newUser = await UserModel.create({
                    ...user,
                    password: this.createHash(password),
                    role: "admin",
                });
                return newUser;
            }
            const newUser = await UserModel.create({ ...user, password: this.createHash(password) });
            return newUser;
        } else return false;
    }

    async login(user: UserLogin) {
        const { email, password } = user;
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            const check = this.isValidPassword(password, userExist.password);
            if (!check) return false;
            return userExist;
        } else return false;
    }

    async getById(id: string) {
        try {
            const user = await UserModel.findById(id);
            if (!user)
                throw new NotFoundError({
                    message: `User with id ${id} was not found`,
                });
            return user;
        } catch (error: any) {
            console.log(error);
        }
    }

    async getByEmail(email: string) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user)
                throw new NotFoundError({
                    message: `User with email ${email} was not found`,
                });
            return user;
        } catch (error: any) {
            console.log(error);
        }
    }

    createHash(password: string) {
        return hashSync(password, genSaltSync(10));
    }

    isValidPassword(passwordUser: string, passwordDB: string) {
        return compareSync(passwordUser, passwordDB);
    }
}
