import express from "express";
import morgan from "morgan";
import handlebars from "express-handlebars";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";

import viewsRouter from "./routes/views.routes.ts";
import usersRouter from "./routes/users.routes.ts";
import cartsRouter from "./routes/carts.routes.ts";
import productsRouter from "./routes/products.routes.ts";
import { connectToDB, connectionString } from "./daos/mongo/connection.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import { __dirname } from "./utils.ts";
import "./daos/mongo/connection.ts";
import "./passport/local.strategy.ts";
import "./passport/github.strategy.ts";

export const PORT = 8080;
export const SERVER_URL = `http://localhost:${PORT}`;

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: "1234",
        },
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
    },
};

connectToDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running in ${SERVER_URL}`);
});
