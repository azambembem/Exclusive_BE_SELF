import { categoryModel } from "../../models/products/index.mjs";

export const get_categories = async (req, res) => {
  const categories = await categoryModel.find();
  // .populate({
  //   path: "created_by",
  //   select: "first_name last_name _id"
  // });

  return res.status(200).json({
    success: true,
    data: categories
  });
};

export const create_categories = async (req, res) => {
  const { name } = req.body; // name orqali postmenda category create qiladi. "name": "Galaxy 25"

  // if (!req.user || !req.user._id) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "Unauthorized. Please login first"
  //   });
  // }
  // const { _id } = req.user;

  const newCategory = new categoryModel({ name }); // created_by: _id name yonida
  // console.log(newCategory.name); // Galaxy 32 qaytaradi.

  const savedCategory = await newCategory.save();

  res.status(200).json({
    success: true,
    data: savedCategory
  });
};

export const update_categories = async (req, res) => {
  const { name, id } = req.body; // yani buyerda id berish orqali category nameni uzgartirsak buladi.
  // 예:{ "name": "Samsung 25", "id": "67ab6e0eaaf1bd49b3a406e7"}

  const updatedCategory = await categoryModel.findById(id);

  if (!updatedCategory) {
    return res.status(404).json({
      success: false,
      message: "Category not found"
    });
  }

  updatedCategory.name = name;

  const savedCategory = await updatedCategory.save();

  return res.status(200).json({
    success: true,
    data: savedCategory
  });
};

export const delete_categories = async (req, res) => {
  const { id } = req.body; // id berish orqali categoryni delete qilinadi.
  //{ "id": "67ab6e0eaaf1bd49b3a406e7"}

  const deletedCategory = await categoryModel.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    data: deletedCategory
  });
};
