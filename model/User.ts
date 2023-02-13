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
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
