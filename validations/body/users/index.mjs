// bu code ni -> https://express-validator.github.io/docs/guides/schema-validation dan olib kelib ishlatilgan

/*
1. Noto‘g‘ri ma’lumotlarni oldindan tekshirish → Dastur ishlayotgan paytda noto‘g‘ri email yoki parol yuborilmasin.
2. Kirishni xavfsiz qilish → Minimal parol uzunligi va to‘g‘ri email formatini talab qilish.
3. Foydalanuvchiga tushunarli xabar berish → Xatolik bo‘lsa, foydalanuvchi nima noto‘g‘ri ekanini bilishi uchun errorMessage qaytariladi.
*/

export const sign_in_validator = {
  email: {
    errorMessage: "Invalid email",
    isEmail: true
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars"
    },
    notEmpty: true, //Parol kiritilmagan bo‘lsa, xatolik chiqadi.
    errorMessage: "Password is required"
  }
};

export const sign_up_validator = {
  email: {
    errorMessage: "Invalid email",
    isEmail: true,
    isLength: {
      options: { min: 2, max: 256 },
      errorMessage: "Username should be at least 6 chars"
    }
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars"
    },
    notEmpty: true,
    errorMessage: "Password is required"
  }
};

export const profile_update_validator = {
  first_name: {
    errorMessage: "Invalid First Name",
    notEmpty: true
  },
  last_name: {
    errorMessage: "Invalid Last Name",
    notEmpty: true
  }
};

export const password_update_validator = {
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars"
    },
    notEmpty: true,
    errorMessage: "Password is required"
  }
};
