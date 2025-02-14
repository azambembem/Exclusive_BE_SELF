import { Schema, model } from "mongoose";

const paymentOptionsSchema = new Schema({
  card_number: {
    type: String,
    required: true
  },
  card_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

export default model("payment-options", paymentOptionsSchema);
