import { NextFunction, Request, Response } from "express";
import { SERVER_URL } from "../index.ts";
import * as service from "../services/product.services.ts";

export const getAllClassic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await service.getAllClassic();
        return res.status(200).json({ msg: "Success", products });
    } catch (error: any) {
        next(error);
    }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, page, sort, query } = req.query;
        let parsedLimit: number | undefined;
        let parsedPage: number | undefined;
        let parsedSort: "asc" | "desc" | undefined;
        if (limit) parsedLimit = Number(limit);
        if (page) parsedPage = Number(page);
        if (sort == "asc" || sort == "desc") parsedSort = sort;
        const response = await service.getAll(parsedLimit, parsedPage, parsedSort, query);
        const { products, totalPages, prevPage, nextPage, hasNextPage, hasPrevPage } = response;
        const nextLink = hasNextPage ? `${SERVER_URL}/api/products?page=${nextPage}` : null;
        const prevLink = hasPrevPage ? `${SERVER_URL}/api/products?page=${prevPage}` : null;
        return res.status(200).json({
            status: "Success",
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page: response.page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        });
    } catch (error: any) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await service.getById(id);
        if (!product) return res.status(404).json({ msg: "Product not found" });
        else return res.status(200).json({ msg: "Success", product });
    } catch (error: any) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newProduct = await service.create(req.body);
        if (!newProduct) res.status(404).json({ msg: "Validation Error!" });
        return res.status(200).json({ msg: "Product created", product: newProduct });
    } catch (error: any) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const productUpd = await service.update(id, req.body);
        return res.json(productUpd);
    } catch (error: any) {
        next(error);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const productDeleted = await service.remove(id);
        return res.status(200).json(productDeleted);
    } catch (error: any) {
        next(error);
    }
};
