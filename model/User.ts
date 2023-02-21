import { Schema, model, models } from "mongoose";
import Layout from "./Layout";
import MainColor from "./MainColors";
import PageName from "./PageName";
import Type from "./Type";

const UserSchema: any = new Schema(
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
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
    },
    blog: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export const getAll = async () => {
  return await User.find({});
};
export const create = async (obj: any) => {
  return await User.create(obj);
};

export const findById = async (id: string) => {
  return await User.findById(id)
    .populate({ path: "layout", model: Layout })
    .populate({ path: "maincolor", model: MainColor })
    .populate({ path: "pagename", model: PageName })
    .populate({ path: "type", model: Type });
};

export const findByEmail = async (email: string) => {
  return await User.findOne({ email })
    .populate({ path: "layout", model: Layout })
    .populate({ path: "maincolor", model: MainColor })
    .populate({ path: "pagename", model: PageName })
    .populate({ path: "type", model: Type });
};

export const findByIdUpdatePost = async (id: string, obj: object) => {
  return await User.findByIdAndUpdate(id, obj);
};
export const findByIdUpdatePatch = async (id: string, obj: object) => {
  const user = await findById(id);
  const updated = { ...user._doc, ...obj };

  return await User.findByIdAndUpdate(id, updated);
};

export const findByEmailAndPath = async (email: string, pathname: string) => {
  try {
    const user = await User.findOne({ email });
    if (user[pathname]) {
      return {
        approved: true,
        data: await User.findOne({ email }, [pathname]).populate(`${pathname}`),
        message: `${pathname} found`,
      };
    } else {
      return { approved: false, message: `${pathname} not found` };
    }
  } catch (error) {}
};

export default User;
