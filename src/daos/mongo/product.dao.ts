import { ProductCreate } from "../fs/products.manager.ts";
import { ProductModel } from "./models/product.model.ts";

export default class ProductDaoMongoDB {
    async getAllClassic() {
        return await ProductModel.find().lean();
    }

    async getAll(limit: number = 10, page: number = 1, sort?: "asc" | "desc", query?: object) {
        const customLabels = {
            totalDocs: false,
            pagingCounter: false,
            limit: false,
            docs: "products",
        };
        return await ProductModel.paginate({ query }, { page, limit, sort: { price: sort }, customLabels, lean: true });
    }

    async getById(id: string) {
        return await ProductModel.findById(id).lean();
    }

    async create(obj: ProductCreate) {
        return await ProductModel.create(obj);
    }

    async update(id: string, obj: ProductCreate) {
        return await ProductModel.findByIdAndUpdate(id, obj, { new: true });
    }

    async delete(id: string) {
        return await ProductModel.findByIdAndDelete(id);
    }
}
