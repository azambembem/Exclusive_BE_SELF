import { Schema, SchemaTypes, model } from "mongoose";

const billingSchema = new Schema({
  user_id: {
    type: SchemaTypes.ObjectId,
    ref: "users"
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  street_address: {
    type: String,
    required: true
  },
  extra_address: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  }
});

export default model("billing", billingSchema);
