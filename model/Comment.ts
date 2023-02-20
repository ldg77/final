import { Schema, model, models } from "mongoose";
import Blog from "./Blog";
import User from "./User";

const CommentSchema = new Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },

  { timestamps: true }
);

const Comment = models.Comment || model("Comment", CommentSchema);

export const getAll = async () => {
  try {
    return await Comment.find({});
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

export const getOne = async (id: string) => {
  try {
    return await Comment.findById(id);
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const createOne = async (obj: object) => {
  try {
    return await Comment.create(obj);
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const createonPath = async (id: string, path: string, obj: object) => {
  try {
    return await Comment.findByIdAndUpdate(id, {
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
    return await Comment.findById(id, [path]);
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

Comment.watch().on("change", async (data) => {
  console.log(data);

  if (data.operationType === "insert") {
    await Blog.findByIdAndUpdate(data.fullDocument.blog, {
      $push: {
        comments: data.fullDocument._id,
      },
    });
  }
});

export default Comment;
