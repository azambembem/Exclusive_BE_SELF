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
    notEmpty: true,
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
