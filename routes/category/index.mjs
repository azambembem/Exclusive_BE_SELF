import { Router } from "express";
import {
  create_categories,
  delete_categories,
  get_categories,
  update_categories
} from "../../conrollers/category/index.mjs";

const router = Router();

router.get("/", get_categories);
router.post("/", create_categories);
router.put("/", update_categories);
router.delete("/", delete_categories);

export default router;
