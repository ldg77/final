import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
    pagename: {
      type: Schema.Types.ObjectId,
      ref: "PageName",
    },
    maincolor: {
      type: Schema.Types.ObjectId,
      ref: "MainColor",
    },
    layout: {
      type: Schema.Types.ObjectId,
      ref: "Layout",
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export const getAll = async () => {
  return await User.find({});
};
export const create = async (obj: any) => {
  return await User.create(obj);
};

export const findById = async (id: string) => {
  return await User.findById(id);
};

export const findByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findByIdUpdatePost = async (id: string, obj: object) => {
  return await User.findByIdAndUpdate(id, obj);
};
export const findByIdUpdatePatch = async (id: string, obj: object) => {
  const user = await findById(id);
  const updated = { ...user._doc, ...obj };

  return await User.findByIdAndUpdate(id, updated);
};
export default User;
