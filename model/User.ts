import { Schema, model, models } from "mongoose";
import Blog from "./Blog";
import Chat from "./Chat";
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
      ref: "Shop",
    },
    shopitem: [
      {
        type: Schema.Types.ObjectId,
        ref: "ShopItem",
      },
    ],
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export const getAll = async () => {
  return await User.find({});
};
export const create = async (obj: any) => {
  try {
    const newUser = await User.create(obj);
    await Chat.create({ user: newUser._id });

    return newUser;
  } catch (error) {}
};

export const findById = async (id: string) => {
  return await User.findById(id)
    .populate({ path: "chat", model: Chat })
    .populate({ path: "type", model: Type })
    .populate({ path: "pagename", model: PageName })
    .populate({ path: "maincolor", model: MainColor })
    .populate({ path: "layout", model: Layout })
    .populate({ path: "blog", model: Blog });
};

export const findByEmail = async (email: string) => {
  return await User.findOne({ email });
  // .populate({ path: "chat", model: Chat })
  // .populate({ path: "type", model: Type })
  // .populate({ path: "pagename", model: PageName })
  // .populate({ path: "maincolor", model: MainColor });
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
  } catch (error) {
    return { approved: false, message: `error: ${error} ` };
  }
};

export default User;
