import { Schema, SchemaTypes, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: SchemaTypes.ObjectId, // // SchemaTypes dan ObjectId ni oliyapti
    ref: "categories"
  },
  star: {
    type: Number,
    default: 0, // default hech qanaqa qiymat berilmagan holatda 0 ga teng
    min: 0,
    max: 5
  },
  price: {
    type: Number,
    default: 0,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  total_count: {
    type: Number,
    default: 0,
    min: 0
  },
  total_sold: {
    type: Number,
    default: 0,
    min: 0
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now(),
    required: true
  },
  main_image: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  colors: {
    type: String,
    enum: ["red", "green", "blue", "yellow", "orange", "purple"]
  }
});

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
});
export const categoryModel = model("category", categorySchema);
export default model("products", productSchema);
