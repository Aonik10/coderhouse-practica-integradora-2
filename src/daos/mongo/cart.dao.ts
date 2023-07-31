import { NotFoundError } from "../../utils/errors.ts";
import { CartModel, ICart } from "./models/cart.model.ts";

export default class CartDaoMongoDB {
    async getById(cid: string) {
        const cart = await CartModel.findById(cid)
            .populate({
                path: "products",
                populate: {
                    path: "product",
                    model: "Product",
                },
            })
            .lean();
        if (!cart)
            throw new NotFoundError({
                message: `Cart with id ${cid} was not found`,
            });
        return cart;
    }

    async create(pid: string) {
        return await CartModel.create({ products: [{ product: pid, quantity: 1 }] });
    }

    async updCart(cid: string, data: ICart) {
        return await CartModel.findByIdAndUpdate(cid, { products: data }, { new: true });
    }

    async emptyCart(cid: string) {
        return await CartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
    }

    async updProductQty(cid: string, pid: string, qty: number) {
        const cartFound = await CartModel.findById(cid);
        if (!cartFound)
            throw new NotFoundError({
                message: `Cart with id ${cid} was not found`,
            });
        const productFound = cartFound.products.find((p) => p.product?.toString() == pid);
        if (!productFound) {
            throw new NotFoundError({
                message: `Product with id ${pid} was not found in the cart ${cid}`,
            });
        } else {
            productFound.quantity = qty;
        }
        cartFound.save();
        return cartFound;
    }

    async addProductToCart(cid: string, pid: string) {
        const cartFound = await CartModel.findById(cid);
        if (!cartFound)
            throw new NotFoundError({
                message: `Cart with id ${cid} was not found`,
            });
        const productFound = cartFound.products.find((p) => p.product?.toString() == pid);
        if (productFound) {
            productFound.quantity++;
        } else {
            // @ts-ignore
            cartFound.products.push({ product: pid, quantity: 1 }); // check how to properly add the pid in typescript
        }
        cartFound.save();
        return cartFound;
    }

    async removeProductFromCart(cid: string, pid: string) {
        const cartFound = await CartModel.findById(cid);
        if (!cartFound)
            throw new NotFoundError({
                message: `Cart with id ${cid} was not found`,
            });

        const productIndex = cartFound.products.findIndex((p) => p.product?._id.toString() == pid);
        if (productIndex < 0) {
            throw new NotFoundError({
                message: `Product with id ${pid} was not found in the cart ${cid}`,
            });
        }

        cartFound.products.splice(productIndex, 1);
        cartFound.save();
        return cartFound;
    }
}
