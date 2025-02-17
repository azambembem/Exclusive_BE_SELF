import { Router } from "express";
import {
  get_purchases,
  init_purchase
} from "../../conrollers/purchase/index.mjs";
import { init_purchase_validator } from "../../validations/body/purchase/index.mjs";
import { checkSchema } from "express-validator";
import { validator } from "../../middlewares/validators.mjs";
import { jwt_auth } from "../../middlewares/jwt.mjs";

const router = Router();

router.post(
  "/init",
  jwt_auth,
  checkSchema(init_purchase_validator),
  validator,
  init_purchase
);
router.get("/", jwt_auth, get_purchases);

export default router;
