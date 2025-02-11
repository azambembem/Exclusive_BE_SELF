import { Router } from "express";
import {
  create_product,
  delete_product,
  get_product,
  update_product
} from "../../conrollers/products/index.mjs";

const router = Router();

// yani biz buyerda conrollers/products ichidan olib keliyapmiz
router.post("/", create_product); // post yaratib beradi
router.put("/", update_product); // put bersa update qiladi
router.delete("/", delete_product); // delete bersa delete qiladi
router.get("/", get_product); // get nima borligi hammasini korsatib beradi

export default router;
