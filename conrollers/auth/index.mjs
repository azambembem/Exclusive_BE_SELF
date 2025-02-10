import { hashPassword, verifyPassword } from "../../tools/password/index.mjs";
import userModel from "../../models/users/index.mjs";
import { generateToken } from "../../tools/jwt/index.mjs";

const sign_in = async (req, res, next) => {
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
      first_name = "Not Provided",
      last_name = "Not Provided"
    } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = new userModel({
      email,
      password: hashedPassword,
      first_name,
      last_name
    });

    const userCredentials = await user.save();

    // console.log(hashedPassword); // password ni hashlab berdi

    const token = generateToken({
      _id: userCredentials._id,
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

export { sign_in, sign_up };
