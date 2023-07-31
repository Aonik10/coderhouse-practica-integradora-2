import { NextFunction, Request, Response } from "express";
import * as service from "../services/cart.services.ts";
import { NotFoundError } from "../utils/errors.ts";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pid } = await req.body;
        if (!pid)
            throw new NotFoundError({
                message: "Please, provide a valid id",
            });
        const newCart = await service.create(pid);
        return res.status(200).json({ msg: "Cart created successfully", cart: newCart });
    } catch (error: any) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cid } = req.params;
        const cartFound = await service.getById(cid);
        return res.status(200).json({ msg: "Success", cart: cartFound });
    } catch (error: any) {
        next(error);
    }
};

export const updCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cid } = req.params;
        const { data } = req.body;
        const cart = await service.updById(cid, data);
        return res.status(200).json({ msg: "Success", cart });
    } catch (error: any) {
        next(error);
    }
};

export const updProductQty = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cid, pid } = req.params;
        const { qty } = req.body;
        const cart = await service.updProductQty(cid, pid, qty);
        return res.status(200).json({ msg: "Success", cart });
    } catch (error: any) {
        next(error);
    }
};

export const emptyCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cid } = req.params;
        const cart = await service.emptyCart(cid);
        return res.status(200).json({ msg: "Success", cart });
    } catch (error: any) {
        next(error);
    }
};

export const addProductToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cid, pid } = req.params;
        const cartFound = await service.addProductToCart(cid, pid);
        return res.status(200).json({ msg: "Product added to cart successfully", cart: cartFound });
    } catch (error: any) {
        next(error);
    }
};

export const removeProductFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cid, pid } = req.params;
        const cartFound = await service.removeProductFromCart(cid, pid);
        return res.status(200).json({ msg: "Product removed from cart successfully", cart: cartFound });
    } catch (error: any) {
        next(error);
    }
};
