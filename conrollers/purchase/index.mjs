// import PurchasesModel from "../../models/purchases/index.mjs";

// export const init_purchase = (req, res, next)= {
//     try {
//         const {billing_id, products} = req.body;
//         const {_id} = req.user;

//         for await [const product of products] {
//             const foundProduct = await ProductsModel.findById(product.product_id);

//             if (!foundProduct) {
//                 throw new Error(`Product with id ${product.product_id} not found.`);
//             }

//             await ProductsModel.findByIdAndUpdate(products.product_id,{
//                 quantity: foundProduct.quantity - product.quantity,
//             })
//         },
//         const purchase = await PurchasesModel.create({
//             billing_id,
//             products,
//             user_id: _id,
//         });

//         return res.status(201).json({
//             success: true,
//             data: purchase,
//         });
//     } catch (error) {
//         next(error);

//     }
// };

import ProductsModel from "../../models/products/index.mjs";
import PurchasesModel from "../../models/purchases/index.mjs";

export const init_purchase = async (req, res, next) => {
  try {
    const { billing_id, products } = req.body;
    const { _id } = req.user;

    for await (const product of products) {
      const foundProduct = await ProductsModel.findById(product.product_id);

      if (!foundProduct) {
        throw new Error(`Product with id ${product.product_id} not found.`);
      }

      await ProductsModel.findByIdAndUpdate(product.product_id, {
        total_count: foundProduct.total_count - product.quantity,
        total_sold: foundProduct.total_sold + product.quantity
      });
    }

    const purchase = await PurchasesModel.create({
      billing_id,
      products,
      user_id: _id
    });

    return res.status(200).json({ success: true, data: purchase });
  } catch (error) {
    next(error);
  }
};

export const get_purchases = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const purchases = await PurchasesModel.find({
      user_id: _id
    })
      .populate({
        path: "billing_id"
      })
      .populate({
        path: "products.product_id"
      })
      .populate({
        path: "user_id"
      });

    return res.status(200).json({
      success: true,
      data: purchases
    });
  } catch (error) {
    next(error);
  }
};
