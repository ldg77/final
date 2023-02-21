import { Schema, model, models } from "mongoose";
import User, { findByIdUpdatePatch as userPatch } from "./User";

const ShopItemSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    avatar: String,
    price: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    selected: { type: Boolean, default: false },
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
    const shopitem = await ShopItem.create(obj);
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
