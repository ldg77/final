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

export const getAllUser = async () => {
  return await User.find({});
};
export const createUser = async (obj: any) => {
  return await User.create(obj);
};

export const findOneUser = async (id: string) => {
  return await User.findById(id);
};

export const findByEmail = async (email: string) => {
  return await User.findOne({ email: email });
};
export default User;
