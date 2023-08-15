import { Router } from "express";
import * as controller from "../controllers/user.controllers.ts";
import passport from "passport";

const router: Router = Router();

router.post("/register", passport.authenticate("register"), controller.registerUser);
router.post("/login", passport.authenticate("login"), controller.loginUser);
router.post("/register-github", passport.authenticate("github", { scope: ["user:email"] }));

export default router;
