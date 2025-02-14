// Routerlar kelib tushadi.
import { Router } from "express";
import auth_route from "./auth/index.mjs"; // ??
import product_route from "./products/index.mjs";
import category_route from "./category/index.mjs";
import billing_route from "./billing/index.mjs";
import payment_options from "./payment-options/index.mjs";

const router = Router();

router.use("/auth", auth_route); // ??
router.use("/products", product_route);
router.use("/billing", billing_route);
router.use("/category", category_route);
router.use("/payment-options", payment_options);

export default router;
// localhost://8080 /auth/sign-in
