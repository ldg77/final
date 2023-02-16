import { Schema, model, models } from "mongoose";
import User from "./User";
import { findByIdUpdatePatch as userPatch } from "./User";
const PageNameSchema = new Schema(
  {
    pagename: {
      type: String,
      required: true,
    },
    slogan: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const PageName = models.PageName || model("PageName", PageNameSchema);

export const getAll = async () => {
  try {
    const pagename = await PageName.find({});
    if (pagename.length) {
      return {
        approved: true,
        data: pagename,
        message: "pagename founded",
      };
    } else {
      return {
        approved: false,
        message: "no pagename found",
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
    const newPagename = await PageName.create(obj);
    await userPatch(newPagename.user, { pagename: newPagename._id });
    return {
      approved: true,
      data: newPagename,
      message: `new pagename width ${newPagename._id} created`,
    };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const findById = async (id: string) => {
  try {
    const pagename = await PageName.findById(id);

    if (pagename) {
      return {
        approved: true,
        data: pagename,
        message: "pagename found",
      };
    } else {
      return {
        approved: false,
        message: "no pagename found",
      };
    }
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

export const findByIdUpdatePost = async (id: string, obj: object) => {
  try {
    return { approved: true, data: await PageName.findByIdAndUpdate(id, obj) };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const findByIdUpdatePatch = async (id: string, obj: object) => {
  try {
    const user = await findById(id);
    const updated = { ...user, ...obj };
    return {
      approved: true,
      data: await PageName.findByIdAndUpdate(id, updated),
    };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

PageName.watch().on("change", async (data) => {
  console.log(data);
  if (data.operationType === "insert") {
    await User.findByIdAndUpdate(data.fullDocument.user, {
      pagename: data.fullDocument._id,
    });
  }
});
export default PageName;
