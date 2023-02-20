import { Schema, model, models } from "mongoose";
import User from "./User";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    theme: { type: String, required: true },
    message: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },

  { timestamps: true }
);

const Blog = models.Blog || model("Blog", BlogSchema);

export const getAll = async () => {
  try {
    return await Blog.find({});
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

export const getOne = async (id: string) => {
  try {
    return await Blog.findById(id);
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const createOne = async (obj: object) => {
  try {
    return await Blog.create(obj);
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const createonPath = async (id: string, path: string, obj: object) => {
  try {
    return await Blog.findByIdAndUpdate(id, {
      $push: {
        [path]: obj,
      },
    });
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const getOnPath = async (id: string, path: string) => {
  try {
    return await Blog.findById(id, [path]);
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

Blog.watch().on("change", async (data) => {
  if (data.operationType === "insert") {
    await User.findByIdAndUpdate(data.fullDocument.user, {
      $push: {
        blog: data.fullDocument._id,
      },
    });
  }
});
