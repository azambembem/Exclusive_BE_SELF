import { Router } from "express";
import {
  create_product,
  delete_product,
  get_product,
  get_product_by_id,
  get_related_products,
  most_popular_monthly_products,
  update_product
} from "../../conrollers/products/index.mjs";

const router = Router();

// yani biz buyerda conrollers/products ichidan olib keliyapmiz
router.post("/", create_product); // post yaratib beradi
router.put("/", update_product); // put bersa update qiladi
router.delete("/", delete_product); // delete bersa delete qiladi
router.get("/", get_product); // get nima borligi hammasini korsatib beradi
router.get("/get-by-id/:id", get_product_by_id);
router.get("/releted/:id", get_related_products);
router.get("/most-popular", most_popular_monthly_products);
router.get("/most-popular-monthly", most_popular_monthly_products);
export default router;
