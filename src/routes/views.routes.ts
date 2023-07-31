import { Router } from "express";
import * as controllers from "../controllers/views.controller.ts";

const router = Router();

router.get("/products", controllers.getProducts);

router.get("/products/:pid", controllers.getProductById);

router.get("/carts/:cid", controllers.getCartById);

export default router;
