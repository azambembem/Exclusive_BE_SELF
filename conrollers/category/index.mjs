import { categoryModel } from "../../models/products/index.mjs";

export const get_categories = async (req, res) => {
  const categories = await categoryModel.find();

  res.status(200).json({
    success: true,
    data: categories
  });
};

export const create_categories = async (req, res) => {
  const { name } = req.body;

  const newCategory = new categoryModel({ name });

  const savedCategory = await newCategory.save();

  res.status(200).json({
    success: true,
    data: savedCategory
  });
};

export const update_categories = async (req, res) => {
  const { name, id } = req.body;

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
  const { id } = req.body;

  const deletedCategory = await categoryModel.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    data: deletedCategory
  });
};
