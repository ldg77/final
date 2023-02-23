import { Schema, model, models, SchemaType } from "mongoose";
import User from "./User";
const ChatMessageSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },

  { timestamps: true }
);

const ChatSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messages: [ChatMessageSchema],
  },

  { timestamps: true }
);

const Chat = models.Chat || model("Chat", ChatSchema);

export const getAll = async () => {
  try {
    const chat = await Chat.find({});
    if (chat) {
      return {
        approved: true,
        data: chat,
        message: "chat found",
      };
    } else {
      return {
        approved: false,
        message: "no chat found",
      };
    }
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

export const getOne = async (id: string) => {
  try {
    return { approved: true, data: await Chat.findById(id) };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const createOne = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    const newChat = await Chat.create({ user: user._id });
    await User.findByIdAndUpdate(user._id, { chat: newChat._id });
    return { approved: true, data: newChat };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const pushOneMessage = async (id: string, obj: object) => {
  try {
    return {
      approved: true,
      data: await Chat.findByIdAndUpdate(id, { $push: { messages: obj } }),
    };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
