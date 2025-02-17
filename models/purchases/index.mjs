import { Schema, model, SchemaTypes } from "mongoose";

const purchaseSchema = new Schema({
  billing_id: {
    type: SchemaTypes.ObjectId,
    ref: "billing"
  },
  products: [
    {
      product_id: {
        type: SchemaTypes.ObjectId,
        ref: "products",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  user_id: {
    type: SchemaTypes.ObjectId,
    ref: "users",
    required: true
  }
});

export default model("purchase", purchaseSchema);
