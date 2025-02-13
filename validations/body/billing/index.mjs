export const post_billing_validator = {
  email: {
    errorMessage: "Invalid email",
    isEmail: true
  },
  first_name: {
    notEmpty: true,
    errorMessage: "First Name is required"
  },
  last_name: {
    notEmpty: true,
    errorMessage: "Last Name is required"
  },
  street_address: {
    notEmpty: true,
    errorMessage: "Street Address is required"
  },
  city: {
    notEmpty: true,
    errorMessage: "City is required"
  },
  phone_number: {
    notEmpty: true,
    errorMessage: "Phone Number is required"
  }
};
