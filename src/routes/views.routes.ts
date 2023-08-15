import { Router } from "express";
import * as controllers from "../controllers/views.controller.ts";

const router = Router();

router.get("/login", controllers.login);

router.get("/register", controllers.register);

router.get("/error-login", controllers.errorLogin);

router.get("/error-register", controllers.errorRegister);

router.get("/products", controllers.getProducts);

router.get("/products/:pid", controllers.getProductById);

router.get("/carts/:cid", controllers.getCartById);

export default router;
