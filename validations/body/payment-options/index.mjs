export const create_options_validator = {
  email: {
    errorMessage: "Invalid email",
    isEmail: true
  },
  card_number: {
    notEmpty: true,
    errorMessage: "Card Number is required",
    isLength: {
      options: { min: 16, max: 16 },
      errorMessage: "Card Number should be 16 digits"
    }
  },
  card_name: {
    notEmpty: true,
    errorMessage: "Card Name is required"
  },
  phone_number: {
    notEmpty: true,
    errorMessage: "Phone Number is required"
  }
};
