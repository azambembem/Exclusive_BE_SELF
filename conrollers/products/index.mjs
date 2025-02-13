import productModel from "../../models/products/index.mjs";
export const create_product = async (req, res) => {
  const {
    name,
    category,
    // created_by,
    star,
    price,
    discount,
    total_count,
    main_image,
    images
  } = req.body;

  const newProduct = new productModel({
    name,
    category,
    // created_by,
    star,
    price,
    discount,
    total_count,
    main_image,
    images
  });

  const productCredentials = await newProduct.save();

  res.status(200).json({
    success: true,
    data: productCredentials
  });
};

export const get_product = async (req, res) => {
  const products = await productModel.find().populate({
    path: "category", // ??
    select: "name _id" // ??
  });
  // .populate({
  //   path: "created_by",
  //   select: "name email"
  // });

  res.status(200).json({
    success: true,
    data: products
  });
};

export const update_product = async (req, res) => {
  const {
    id,
    name,
    star,
    price,
    discount,
    total_count,
    total_sold,
    main_image,
    images
  } = req.body;

  const product = await productModel.findById(id);

  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  product.name = name || product.name;
  product.star = star || product.star;
  product.price = price || product.price;
  product.discount = discount || product.discount;
  product.total_count = total_count || product.total_count;
  product.total_sold = total_sold || product.total_sold;
  product.main_image = main_image || product.main_image;
  product.images = images || product.images;

  const updatedProduct = await product.save();

  return res.status(200).json({
    success: true,
    data: updatedProduct
  });
};

export const delete_product = async (req, res) => {
  const product = await productModel.findByIdAndDelete(_id);

  return res.status(200).json({
    success: true,
    data: product
  });
};

export const most_popular_products = async (req, res) => {
  const popularProducts = await productModel
    .find()
    .sort({ total_sold: -1 }) // sort sartirofka qiliniyapti yani top eng ko'p sotilgan productlar
    .limit(10) //  top eng ko'p sotilgan nechtaligi buyerda -> 10
    .populate({
      path: "category",
      select: "name _id"
    });
  // .populate({
  //   path: "created_by",
  //   select: "name email"
  // });

  res.status(200).json({
    success: true,
    data: popularProducts
  });
};

export const most_popular_monthly_products = async (req, res) => {
  const thisMonthlyProducts = await productModel
    .find()
    .sort({ total_sold: -1 })
    .limit(10)
    .populate({
      path: "category",
      select: "name _id"
    });
  // .populate({
  //   path: "created_by",
  //   select: "name email"
  // });

  res.status(200).json({
    success: true,
    data: thisMonthlyProducts
  });
};
