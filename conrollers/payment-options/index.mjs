import paymentOptionsModel from "../../models/payment-options/index.mjs";

export const get_options = async (req, res, next) => {
  try {
    const data = await paymentOptionsModel.find({
      user_id: req.user._id
    });
    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    return next(error);
  }
};

export const get_option = async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await paymentOptionsModel.find(_id);

    if (!card) throw new Error("Card not found");

    return res.status(200).json({ success: true, data: card });
  } catch (error) {
    return next(error);
  }
};

export const create_options = async (req, res, next) => {
  try {
    const { phone_number, card_number, card_name } = req.body;

    const card = await paymentOptionsModel.find({
      phone_number,
      card_number,
      card_name,
      user_id: req.user._id
    });

    return res.status(201).json({ success: true, data: card });
  } catch (error) {
    return next(error);
  }
};

export const update_options = async (req, res, next) => {
  try {
    const { phone_number, card_number, card_name, _id } = req.body;

    const updatedCard = await paymentOptionsModel.findById(_id);

    if (!updatedCard) throw new Error("Card not found");

    updatedCard.phone_number = phone_number || updatedCard.phone_number;
    updatedCard.card_number = card_number || updatedCard.card_number;
    updatedCard.card_name = card_name || updatedCard.card_name;

    await updatedCard.save();
  } catch (error) {
    return next(error);
  }
};

export const delete_options = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const deletedCard = await paymentOptionsModel.findByIdAndDelete(_id);

    if (!deletedCard) throw new Error("Card not found");
    await paymentOptionsModel.findByIdAndDelete(deletedCard._id); // ?

    return res.status(200).json({ success: true, data: deletedCard });
  } catch (error) {
    return next(error);
  }
};
