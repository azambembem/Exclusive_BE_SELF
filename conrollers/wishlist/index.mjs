import Wishlist from "../../models/wishlist/index.mjs";

export const get_wishlist = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const wishlist = await Wishlist.find({ user_id: _id })
      .populate({
        path: "product_id"
      })
      .populate({
        path: "user_id"
      });
    return res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    return next(error);
  }
};

export const create_wishlist = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const { _id } = req.user;

    const wishlist = await Wishlist.create({ user_id: _id, product_id });

    return res.status(201).json({ success: true, data: wishlist });
  } catch (error) {
    return next(error);
  }
};

export const delete_wishlist = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const { _id } = req.user;

    const wishlist = await Wishlist.findOneAndDelete({
      user_id: _id,
      product_id
    });

    return res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    return next(error);
  }
};
