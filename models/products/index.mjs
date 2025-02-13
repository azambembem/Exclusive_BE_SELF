import { Schema, SchemaTypes, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // created_by: {
  //   type: SchemaTypes.ObjectId, // // SchemaTypes dan ObjectId ni oliyapti
  //   ref: "users"
  // },
  category: {
    type: SchemaTypes.ObjectId, // // SchemaTypes dan ObjectId ni oliyapti
    ref: "category" // ??
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
    type: Array, // array berishdan maqsad bir nechta rasmlarni solsa buladi.
    required: true
  },
  colors: {
    type: String
  },
  hashtags: {
    // hashtags nima? productni turlixil nomlar bn search qilishga aytiladi.
    type: Array,
    required: true,
    default: []
  }
});

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // created_by: {
  //   type: SchemaTypes.ObjectId, // // SchemaTypes dan ObjectId ni oliyapti
  //   ref: "users"
  // },
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
