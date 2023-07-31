import { Router } from "express";
import * as controller from "../controllers/cart.controllers.ts";

const router = Router();

router.post("/", controller.create);

router.get("/:cid", controller.getById);

router.put("/:cid", controller.updCart);

router.delete("/:cid", controller.emptyCart);

router.post("/:cid/products/:pid", controller.addProductToCart);

router.put("/:cid/products/:pid", controller.updProductQty);

router.delete("/:cid/products/:pid", controller.removeProductFromCart);

export default router;
