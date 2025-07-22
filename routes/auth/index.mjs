// Routelarimiz faqat routesda

import { Router } from "express"; // 1.
import passport from "passport";
import {
  sign_in,
  sign_up,
  update_password,
  update_profile
} from "../../conrollers/auth/index.mjs";
import {
  password_update_validator,
  profile_update_validator,
  sign_in_validator,
  sign_up_validator
} from "../../validations/body/users/index.mjs";
import { checkSchema } from "express-validator"; // sign_up_validator ni ishlatish uchun checkSchema import
import { validator } from "../../middlewares/validators.mjs";
import { jwt_auth } from "../../middlewares/jwt.mjs";
import { generateToken } from "../../tools/jwt/index.mjs";
const router = Router(); // 2

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false
  }),
  (req, res) => {
    // JWT token generatsiya qilamiz
    const token = generateToken({ _id: req.user._id, email: req.user.email });

    // Frontendga redirect qilamiz token bilan
    // res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
    res.redirect(`http://localhost:5173/?token=${token}`);
  }
);

router.post("/sign-in", checkSchema(sign_in_validator), validator, sign_in); // 4
router.post("/sign-up", checkSchema(sign_up_validator), validator, sign_up); // 5
router.put(
  "/profile",
  checkSchema(profile_update_validator),
  jwt_auth,
  update_profile
);

router.put(
  "/password",
  checkSchema(password_update_validator),
  jwt_auth,
  update_password
);

export default router; // 3
