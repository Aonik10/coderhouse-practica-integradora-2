import { Schema, model, InferSchemaType } from "mongoose";

const cartSchema = new Schema(
    {
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: { type: Number, default: 1 },
                _id: false,
            },
        ],
    },
    {
        versionKey: false,
    }
);

export type ICart = InferSchemaType<typeof cartSchema>;
export const CartModel = model<ICart>("Cart", cartSchema);
