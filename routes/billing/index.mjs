import { Router } from "express";
import {
  get_billing,
  post_billing,
  patch_billing,
  delete_billing
} from "../../conrollers/billing/index.mjs";
import { checkSchema } from "express-validator";
import { post_billing_validator } from "../../validations/body/billing/index.mjs";
// import { jwt_auth } from "../../middlewares/jwt.mjs";
import { jwt_auth } from "../../middlewares/jwt.mjs";
import { validator } from "../../middlewares/validators.mjs";
const router = Router();

router.get("/:user_id", get_billing);
router.post(
  "/",
  jwt_auth,
  checkSchema(post_billing_validator),
  validator,
  post_billing
);
router.patch("/:billing_id", jwt_auth, patch_billing);
router.delete("/:billing_id", jwt_auth, delete_billing);

export default router;
