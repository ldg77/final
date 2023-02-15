import { Schema, model, models } from "mongoose";
import User from "./User";

const layoutSchema = new Schema(
  {
    layouts: Object,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Layout = models.Layout || model("Layout", layoutSchema);

export const getAll = async () => {
  return await Layout.find({}).sort({ updatedAt: -1 });
};
export const create = async (obj: any) => {
  return await Layout.create(obj);
};

export const findById = async (id: string) => {
  return await Layout.findById(id);
};

export const findByIdUpdatePost = async (id: string, obj: object) => {
  return await Layout.findByIdAndUpdate(id, obj);
};
export const findByIdUpdatePatch = async (id: string, obj: object) => {
  const user = await findById(id);
  const updated = { ...user._doc, ...obj };

  return await Layout.findByIdAndUpdate(id, updated);
};

Layout.watch().on("change", async (data) => {
  if (data.operationType === "insert") {
    await User.findByIdAndUpdate(data.fullDocument.user, {
      layout: data.fullDocument._id,
    });
  }
});
