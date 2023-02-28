import { Schema, model, models } from "mongoose";
import User, { findByIdUpdatePatch as userPatch } from "./User";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const ShopItemSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    avatar: String,
    price: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    selected: { type: Boolean, default: false },
    stripe: {},
  },
  { timestamps: true }
);

const ShopItem = models.ShopItem || model("ShopItem", ShopItemSchema);

export const getAll = async () => {
  try {
    const maincolor = await ShopItem.find({});
    if (maincolor.length) {
      return {
        approved: true,
        data: maincolor,
        message: "shopitem found",
      };
    } else {
      return {
        approved: false,
        message: "no shopitem found",
      };
    }
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const create = async (obj: any) => {
  try {
    const product = await stripe.products.create({
      name: obj.productName,
      default_price_data: {
        currency: "eur",
        unit_amount: +obj.price * 100,
      },
    });
    const shopitem = await ShopItem.create({ ...obj, stripe: product });
    await User.findByIdAndUpdate(shopitem.user, {
      $push: { shopitem: shopitem._id },
    });
    return {
      approved: true,
      data: shopitem,
      message: `new shopitem width ${shopitem._id} created`,
    };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

export const unselect = async (id: string) => {
  try {
    const userShopItemsArray = await User.findById(id);

    return {
      approved: true,
      data: {},
      message: `shopitem cleend`,
    };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

export const findById = async (id: string) => {
  return await ShopItem.findById(id);
};

export const findByIdUpdatePost = async (id: string, obj: object) => {
  return await ShopItem.findByIdAndUpdate(id, obj);
};
export const findByIdUpdatePatch = async (id: string, obj: object) => {
  const shopitem = await findById(id);
  const updated = { ...shopitem._doc, ...obj };

  return await ShopItem.findByIdAndUpdate(id, updated);
};

export default ShopItem;
