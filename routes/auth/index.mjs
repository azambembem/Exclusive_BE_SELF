// Routelarimiz faqat routesda

import { Router } from "express"; // 1.
import { sign_in, sign_up } from "../../conrollers/auth/index.mjs";
import {
  sign_in_validator,
  sign_up_validator
} from "../../validations/body/users/index.mjs";
import { checkSchema } from "express-validator"; // sign_up_validator ni ishlatish uchun checkSchema import
import { validator } from "../../middlewares/validators.mjs";
const router = Router(); // 2

router.post("/sign-in", checkSchema(sign_in_validator), validator, sign_in); // 4
router.post("/sign-up", checkSchema(sign_up_validator), validator, sign_up); // 5

export default router; // 3
