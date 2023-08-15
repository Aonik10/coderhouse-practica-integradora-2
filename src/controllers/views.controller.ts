import { Request, Response } from "express";
import * as productService from "../services/product.services.ts";
import * as cartService from "../services/cart.services.ts";

export const register = (req: Request, res: Response) => {
    res.render("register");
};

export const errorRegister = (req: Request, res: Response) => {
    res.render("errorRegister");
};

export const login = (req: Request, res: Response) => {
    res.render("login");
};

export const errorLogin = (req: Request, res: Response) => {
    res.render("errorLogin");
};

export const getProducts = async (req: Request, res: Response) => {
    const data = await productService.getAll();
    const keys = ["title", "description", "code", "price", "category", "thumbnails"];
    res.render("home", { data, keys });
};

export const getProductById = async (req: Request, res: Response) => {
    const { pid } = req.params;
    const product = await productService.getById(pid);
    res.render("product", { product });
};

export const getCartById = async (req: Request, res: Response) => {
    const { cid } = req.params;
    const cart = await cartService.getById(cid);
    res.render("carts", { cart });
};
