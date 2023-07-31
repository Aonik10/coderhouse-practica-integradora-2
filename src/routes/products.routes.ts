import { Router, Request, Response } from "express";
import * as controller from "../controllers/product.controllers.ts";

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.remove);

export default router;
