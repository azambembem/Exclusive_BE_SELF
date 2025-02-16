import PaymentOptionsModel from "../../models/payment-options/index.mjs";

export const get_options = async (req, res, next) => {
  try {
    const data = await PaymentOptionsModel.find({
      user_id: req.user._id
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

export const get_option = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const card = await PaymentOptionsModel.find(_id);

    if (!card) throw new Error("Card not found");

    return res.status(200).json({ success: true, data: card });
  } catch (error) {
    return next(error);
  }
};

export const create_options = async (req, res, next) => {
  try {
    const { phone_number, card_number, card_name } = req.body;

    const card = await PaymentOptionsModel.create({
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

    const updatedCard = await PaymentOptionsModel.findById(_id);

    if (!updatedCard) throw new Error("Card not found");

    updatedCard.phone_number = phone_number || updatedCard.phone_number;
    updatedCard.card_number = card_number || updatedCard.card_number;
    updatedCard.card_name = card_name || updatedCard.card_name;

    await updatedCard.save();
    return res.status(200).json({ success: true, data: updatedCard });
  } catch (error) {
    return next(error);
  }
};

export const delete_options = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const deletedCard = await PaymentOptionsModel.findByIdAndDelete(_id);

    if (!deletedCard) throw new Error("Card not found");
    await PaymentOptionsModel.findByIdAndDelete(deletedCard._id); // ?

    return res.status(200).json({ success: true, data: deletedCard });
  } catch (error) {
    return next(error);
  }
};
