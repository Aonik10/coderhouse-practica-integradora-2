import { Schema, model } from "mongoose";

export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    age: number;
    password: string;
    isGithub: boolean;
    role: "user" | "admin";
}

export interface IUserCreated extends IUser {
    _id: string;
}

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isGithub: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "user",
    },
});

export const UserModel = model<IUser>("users", userSchema);
