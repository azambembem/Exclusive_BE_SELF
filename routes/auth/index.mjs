import { Router } from "express";
import { sign_in, sign_up } from "../../conrollers/auth/index.mjs";
import {
  sign_in_validator,
  sign_up_validator
} from "../../validations/body/users/index.mjs";
import { checkSchema } from "express-validator"; // sign_up_validator ni ishlatish uchun checkSchema import
import { validator } from "../../middlewares/validators.mjs";
const router = Router();

router.post("/sign-in", checkSchema(sign_in_validator), validator, sign_in);
router.post("/sign-up", checkSchema(sign_up_validator), validator, sign_up);

export default router;
