import { Schema, model } from "mongoose";

const userSchema = new Schema({
  create_at: {
    type: Date,
    default: Date.now(),
    required: [true, "Created at date is required."],
    immutable: [true, "Created at date is immutable."]
    // immimmutable: false bo‘lsa yoki immutable umuman qo‘shilmasa: //  name ham, email ham erkin o‘zgartirilishi mumkin.
  },
  update_at: {
    type: Date,
    default: Date.now(),
    required: [true, "Updated at date is required"]
  },
  first_name: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name must be at least 2 characters long"],
    maxlength: [128, "First name must not exceed 50 characters"]
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name must be at least 2 characters long"],
    maxlength: [128, "Last name must not exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    minlength: [2, "Eng kichigi 2 o'lchamda "],
    maxlength: [256, "Eng kattasi 256 o'lchamda"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [256, "Password must not exceed 256 characters"]
  },
  profile_picture: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/anonymous-avatars-grey-circles_78370-2086.jpg?ga=GA1.1.917091214.1739122099&semt=ais_hybrid"
  }
});
userSchema.post("updateOne", async function () {
  this.update_at = Date.now();
});

export default model("users", userSchema);
