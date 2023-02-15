import { Schema, model, models } from "mongoose";
import User from "./User";

const mainColorSchema = new Schema(
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

const MainColor = models.MainColor || model("MainColor", mainColorSchema);

export const getAll = async () => {
  return await MainColor.find({}).sort({ updatedAt: -1 });
};
export const create = async (obj: any) => {
  return await MainColor.create(obj);
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
