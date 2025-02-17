import userModel from "../../models/users/index.mjs";
import billingModel from "../../models/billing/index.mjs";

export const get_billing = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const billing = await billingModel.findOne({ user_id });

    if (!billing) throw new Error("Billing not found");

    return res.status(200).json({
      success: true,
      data: billing
    });
  } catch (error) {
    next(error);
  }
};

export const post_billing = async (req, res, next) => {
  try {
    const {
      user_id,
      first_name,
      last_name,
      email,
      street_address,
      extra_address,
      city,
      phone_number
    } = req.body;

    if (!user_id) throw new Error("User id is required");

    const user = await userModel.findById(user_id);

    if (!user) throw new Error("User not found");

    const billing = new billingModel({
      user_id, // : req.user._id,
      first_name,
      last_name,
      email,
      street_address,
      extra_address,
      city,
      phone_number
    });

    const saved_billing = await billing.save();

    return res.status(200).json({
      success: true,
      data: saved_billing
    });
  } catch (error) {
    next(error);
  }
};

export const patch_billing = async (req, res, next) => {
  const { billing_id } = req.params;

  const billing = await billingModel.findById(billing_id);

  if (!billing) throw new Error("Billing not found");

  try {
    const {
      first_name,
      last_name,
      email,
      street_address,
      extra_address,
      city,
      phone_number
    } = req.body;

    billing.first_name = first_name || billing.first_name;
    billing.last_name = last_name || billing.last_name;
    billing.email = email || billing.email;
    billing.street_address = street_address || billing.street_address;
    billing.extra_address = extra_address || billing.extra_address;
    billing.city = city || billing.city;
    billing.phone_number = phone_number || billing.phone_number;

    const updated_billing = await billing.save();

    return res.status(200).json({
      success: true,
      data: updated_billing
    });
  } catch (error) {
    next(error);
  }
};

export const delete_billing = async (req, res, next) => {
  const { billing_id } = req.params;

  try {
    const billing = await billingModel.findById(billing_id);

    if (!billing) throw new Error("Billing not found");

    await billingModel.findByIdAndDelete(billing_id);

    return res.status(200).json({
      success: true,
      data: billing
    });
  } catch (error) {
    next(error);
  }
};
