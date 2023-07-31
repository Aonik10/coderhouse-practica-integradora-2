import { DatabaseError, NotFoundError } from "../utils/errors.ts";
import CartDaoMongoDB from "../daos/mongo/cart.dao.ts";
import { ICart } from "../daos/mongo/models/cart.model.ts";

const cartDao = new CartDaoMongoDB();

// import CartManager from "../daos/fs/carts.manager.ts";

// const cartDao = new ProductManager("./src/carts.json")

export const getById = async (cid: string) => {
    try {
        return await cartDao.getById(cid);
    } catch (error: any) {
        if (!(error instanceof NotFoundError)) {
            throw new DatabaseError({
                name: "GET_ERROR",
                message: `Error occurred while getting a cart by id ${cid}`,
            });
        }
    }
};

export const updById = async (cid: string, data: ICart) => {
    try {
        return await cartDao.updCart(cid, data);
    } catch (error: any) {
        if (!(error instanceof NotFoundError)) {
            throw new DatabaseError({
                name: "UPDATE_ERROR",
                message: `Error occurred while attempting to update cart with id ${cid}`,
            });
        }
    }
};

export const create = async (pid: string) => {
    try {
        return await cartDao.create(pid);
    } catch (error: any) {
        throw new DatabaseError({
            name: "CREATE_ERROR",
            message: `Error occurred while creating a cart with productId ${pid}`,
        });
    }
};

export const emptyCart = async (cid: string) => {
    try {
        return await cartDao.emptyCart(cid);
    } catch (error: any) {
        throw new DatabaseError({
            name: "DELETE_ERROR",
            message: `Error occurred while attempting to drop items from cart with id ${cid}`,
        });
    }
};

export const addProductToCart = async (cid: string, pid: string) => {
    try {
        return await cartDao.addProductToCart(cid, pid);
    } catch (error: any) {
        if (!(error instanceof NotFoundError)) {
            throw new DatabaseError({
                name: "UPDATE_ERROR",
                message: `Error occurred while attempting to add product ${pid} to a cart with id ${cid}`,
            });
        }
    }
};

export const updProductQty = async (cid: string, pid: string, qty: number) => {
    try {
        return await cartDao.updProductQty(cid, pid, qty);
    } catch (error: any) {
        if (!(error instanceof NotFoundError)) {
            throw new DatabaseError({
                name: "UPDATE_ERROR",
                message: `Error occurred while attempting to add product ${pid} to a cart with id ${cid}`,
            });
        }
    }
};

export const removeProductFromCart = async (cid: string, pid: string) => {
    try {
        return await cartDao.removeProductFromCart(cid, pid);
    } catch (error: any) {
        if (!(error instanceof NotFoundError)) {
            throw new DatabaseError({
                name: "DELETE_ERROR",
                message: `Error occurred while attempting to remove product ${pid} from cart with id ${cid}`,
            });
        }
    }
};
