import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export { hashPassword, verifyPassword };
