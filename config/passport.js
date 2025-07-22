import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/users/index.mjs"; // user model manziling to‘g‘ri bo‘lishi kerak

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:7070/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Foydalanuvchi mavjudmi tekshirish
        let user = await userModel.findOne({ email: profile.emails[0].value });
        if (!user) {
          // Bo'lmasa yaratamiz
          user = await userModel.create({
            email: profile.emails[0].value,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            password: "google_oauth" // yoki random string; ishlatilmaydi baribir
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // faqat id saqlaymiz
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
