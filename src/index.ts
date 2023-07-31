import express from "express";
import morgan from "morgan";
import handlebars from "express-handlebars";

import viewsRouter from "./routes/views.routes.ts";
import cartsRouter from "./routes/carts.routes.ts";
import productsRouter from "./routes/products.routes.ts";
import { connectToDB } from "./daos/mongo/connection.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import { __dirname } from "./utils.ts";
import "./daos/mongo/connection.ts";

export const PORT = 8080;
export const SERVER_URL = `http://localhost:${PORT}`;

connectToDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running in ${SERVER_URL}`);
});
