// funksiyalar conrollers inchida
import { hashPassword, verifyPassword } from "../../tools/password/index.mjs";
import userModel from "../../models/users/index.mjs";
import { generateToken } from "../../tools/jwt/index.mjs";

const sign_in = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }
    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = generateToken({
      _id: user._id,
      email: user.email
    });

    return res.status(200).json({
      success: true,
      data: {
        user,
        token
      }
    }); //  tekshirishdagi code
  } catch (error) {
    next(error);
  }
};

//localhost:8080/auth/sign-up -> orqali email bn password berib tekshirish mumkin..
const sign_up = async (req, res, next) => {
  try {
    const {
      email,
      password,
      first_name = "Not Provided", // schemada first_name required qilinganligi uchun
      last_name = "Not Provided" // schemada last_name required qilinganligi uchun
    } = req.body;

    const hashedPassword = await hashPassword(password);
    // console.log(hashedPassword); // $2b$10$/CEk9cgzxk0p1Ahd2cNiC.2oY.1kLUAy.CRCfmmr4eWGmPDwvsHxa

    // console.log(hashedPassword); // password ni hashlab berdi

    const user = new userModel({
      // Yangi royxatdan o'tuvchi yaratish
      email,
      password: hashedPassword,
      first_name,
      last_name
    });

    const userCredentials = await user.save(); //user.save() → Yangi foydalanuvchini MongoDB ga saqlaydi.

    const token = generateToken({
      // _id va email qayerdan kelmoqda?? -> _id va email userCredentials obyektidan olinmoqda
      // userCredentials._id → MongoDB dagi foydalanuvchining _id si, ya'ni har bir foydalanuvchining unikal identifikatori.
      _id: userCredentials._id, // ?? mana buyerdagi id bn email qayerdan keliyapti va nima vazifani bajariyapti?
      email: userCredentials.email
    });

    return res.status(200).json({
      succses: true,
      data: {
        user: userCredentials,
        token
      }
    }); //  tekshirishdagi code
  } catch (error) {
    next(error);
  }
};

const update_profile = async (req, res, next) => {
  try {
    const { first_name, last_name } = req.body;
    const { _id } = req.user;

    const user = await userModel.findById(_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    await userModel.findByIdAndUpdate(_id, {
      first_name,
      last_name
    });

    return res.status(200).json({
      success: true,
      data: {
        user: await userModel.findById(_id)
      }
    });
  } catch (error) {
    next(error);
  }
};

const update_password = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { password } = req.body;

    const user = await userModel.findById(_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await userModel.findByIdAndUpdate(_id, {
      password: await hashPassword(password)
    });

    return res.status(200).json({
      success: true,
      data: {
        user: await userModel.findById(_id)
      }
    });
  } catch (error) {
    next(error);
  }
};

export { sign_in, sign_up, update_profile, update_password };
