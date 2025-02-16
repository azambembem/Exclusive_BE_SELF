import { Router } from "express";
import {
  create_options,
  delete_options,
  get_option,
  get_options,
  update_options
} from "../../conrollers/payment-options/index.mjs";
import { create_options_validator } from "../../validations/body/payment-options/index.mjs";
import { checkSchema } from "express-validator";
import { validator } from "../../middlewares/validators.mjs";
import { jwt_auth } from "../../middlewares/jwt.mjs";

const router = Router();

router.get("/", jwt_auth, get_options);
router.get("/:_id", jwt_auth, get_option);
router.post(
  "/",
  jwt_auth,
  checkSchema(create_options_validator),
  validator,
  create_options
);
router.put("/", jwt_auth, update_options);
router.delete("/:_id", jwt_auth, delete_options);

export default router;
