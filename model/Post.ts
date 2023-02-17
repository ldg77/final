import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    name: String,

    comments: [
      {
        name: {
          type: String,
        },
      },
    ],
    likes: [
      {
        name: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
const Post = models.PostSchema || model("PostSchema", PostSchema);

export const getAll = async () => {
  try {
    return await Post.find({});
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

export const getOne = async (id: string) => {
  try {
    return await Post.findById(id);
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const createOne = async (obj: object) => {
  try {
    return await Post.create(obj);
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const createonPath = async (id: string, path: string, obj: object) => {
  try {
    return await Post.findByIdAndUpdate(id, {
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
    return await Post.findById(id, [path]);
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
