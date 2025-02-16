import { Router } from "express";
import {
  get_wishlist,
  create_wishlist,
  delete_wishlist
} from "../../conrollers/wishlist/index.mjs";
import { jwt_auth } from "../../middlewares/jwt.mjs";
import { checkSchema } from "express-validator";
import { validator } from "../../middlewares/validators.mjs";
import { create_wishlist_validator } from "../../validations/body/wishlist/index.mjs";

const router = Router();

router.get("/", jwt_auth, get_wishlist);

router.post(
  "/",
  jwt_auth,
  checkSchema(create_wishlist_validator),
  validator,
  create_wishlist
);

router.delete("/:product_id", jwt_auth, delete_wishlist);

export default router;
