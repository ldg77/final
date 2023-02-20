import { Schema, model, models } from "mongoose";
import Comment from "./Comment";
import User, { findByIdUpdatePatch as userPatch } from "./User";

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
    return await Blog.find({}).populate({ path: "comments", model: Comment });
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
export const createOne = async (obj: any) => {
  try {
    const newBlog = await Blog.create(obj);
    await User.findOneAndUpdate(
      { _id: obj.user },
      { $push: { blog: newBlog._id } }
    );
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

export default Blog;
