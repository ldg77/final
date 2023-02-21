import { Schema, model, models } from "mongoose";
import { findByIdUpdatePatch as userPatch } from "./User";

const ShopItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  onsale: Boolean,
  avatar: String,
  price: Number,
});

const ShopSchema = new Schema(
  {
    theme: {
      type: String,
      required: true,
    },
    item: ShopItemSchema,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Shop = models.Shop || model("Shop", ShopSchema);

export const getAll = async () => {
  try {
    const maincolor = await Shop.find({});
    if (maincolor.length) {
      return {
        approved: true,
        data: maincolor,
        message: "shop founded",
      };
    } else {
      return {
        approved: false,
        message: "no shop found",
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
    const shop = await Shop.create(obj);
    await userPatch(shop.user, { maincolor: shop._id });
    return {
      approved: true,
      data: shop,
      message: `new shop width ${shop._id} created`,
    };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

export const findById = async (id: string) => {
  return await Shop.findById(id);
};

export const findByIdUpdatePost = async (id: string, obj: object) => {
  return await Shop.findByIdAndUpdate(id, obj);
};
export const findByIdUpdatePatch = async (id: string, obj: object) => {
  const user = await findById(id);
  const updated = { ...user._doc, ...obj };

  return await Shop.findByIdAndUpdate(id, updated);
};

export default Shop;
