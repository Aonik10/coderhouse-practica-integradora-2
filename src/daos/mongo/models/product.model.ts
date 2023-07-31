import { Schema, model, InferSchemaType, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        category: { type: String, default: "Others" },
        thumbnails: [{ type: String }],
    },
    {
        versionKey: false,
    }
);

productSchema.plugin(paginate);

type IProduct = InferSchemaType<typeof productSchema>;
export const ProductModel = model<IProduct, PaginateModel<IProduct>>("Product", productSchema);
