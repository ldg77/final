import { Schema, model, models } from "mongoose";
import User from "./User";
import { findByIdUpdatePatch as userPatch } from "./User";
const MainColorSchema = new Schema(
  {
    backgroundColor: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const MainColor = models.MainColor || model("MainColor", MainColorSchema);

export const getAll = async () => {
  try {
    const maincolor = await MainColor.find({});
    if (maincolor.length) {
      return {
        approved: true,
        data: maincolor,
        message: "maincolor founded",
      };
    } else {
      return {
        approved: false,
        message: "no maincolor found",
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
    const newMainColor = await MainColor.create(obj);
    await userPatch(newMainColor.user, { maincolor: newMainColor._id });
    return {
      approved: true,
      data: newMainColor,
      message: `new maincolor width ${newMainColor._id} created`,
    };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

export const findById = async (id: string) => {
  return await MainColor.findById(id);
};

export const findByIdUpdatePost = async (id: string, obj: object) => {
  return await MainColor.findByIdAndUpdate(id, obj);
};
export const findByIdUpdatePatch = async (id: string, obj: object) => {
  const user = await findById(id);
  const updated = { ...user._doc, ...obj };

  return await MainColor.findByIdAndUpdate(id, updated);
};

MainColor.watch().on("change", async (data) => {
  if (data.operationType === "insert") {
    await User.findByIdAndUpdate(data.fullDocument.user, {
      maincolor: data.fullDocument._id,
    });
  }
});
export default MainColor;
