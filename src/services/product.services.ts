import { DatabaseError } from "../utils/errors.ts";
import ProductDaoMongoDB from "../daos/mongo/product.dao.ts";

const productDao = new ProductDaoMongoDB();

// import ProductManager from "../daos/fs/products.manager.ts";

// const productDao = new ProductManager("./src/products.json")

export const getAllClassic = async () => {
    try {
        return await productDao.getAllClassic();
    } catch (error: any) {
        throw new DatabaseError({
            name: "GET_ERROR",
            message: "Error occurred while getting products",
        });
    }
};

export const getAll = async (limit?: number, page?: number, sort?: "asc" | "desc", query?: any) => {
    try {
        return await productDao.getAll(limit, page, sort, query);
    } catch (error: any) {
        throw new DatabaseError({
            name: "GET_ERROR",
            message: "Error occurred while getting products",
        });
    }
};

export const getById = async (id: string) => {
    try {
        return await productDao.getById(id);
    } catch (error: any) {
        throw new DatabaseError({
            name: "GET_ERROR",
            message: `Error occurred while getting a product by id ${id}`,
        });
    }
};

export const create = async (obj: any) => {
    try {
        return await productDao.create(obj);
    } catch (error: any) {
        throw new DatabaseError({
            name: "CREATE_ERROR",
            message: "Error occurred while creating product",
        });
    }
};

export const update = async (id: string, obj: any) => {
    try {
        return await productDao.update(id, obj);
    } catch (error: any) {
        throw new DatabaseError({
            name: "UPDATE_ERROR",
            message: `Error occurred while updating product with id ${id}`,
        });
    }
};

export const remove = async (id: string) => {
    try {
        return await productDao.delete(id);
    } catch (error: any) {
        throw new DatabaseError({
            name: "DELETE_ERROR",
            message: `Error occurred while attempting to delete product with id ${id}`,
        });
    }
};
