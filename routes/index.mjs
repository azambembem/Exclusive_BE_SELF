// Routerlar kelib tushadi.
import { Router } from "express";
import auth_route from "./auth/index.mjs";
const router = Router();

router.use("/auth", auth_route);

export default router;
