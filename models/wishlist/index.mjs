import { Schema, model, SchemaTypes } from "mongoose";

const wishlistSchema = new Schema({
  user_id: {
    type: SchemaTypes.ObjectId,
    ref: "users",
    required: true
  },
  product_id: {
    type: SchemaTypes.ObjectId,
    ref: "products",
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

export default model("wishlists", wishlistSchema);
