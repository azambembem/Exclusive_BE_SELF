import { Router } from "express";
import {
  create_categories,
  delete_categories,
  get_categories,
  update_categories
} from "../../conrollers/category/index.mjs";
import { jwt_auth } from "../../middlewares/jwt.mjs";

const router = Router();

router.get("/", get_categories);
router.post("/", jwt_auth, create_categories);
router.put("/", jwt_auth, update_categories);
router.delete("/", jwt_auth, delete_categories);

export default router;
