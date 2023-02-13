import { Schema, model, models } from "mongoose";
import User from "./User";

const mainColorSchema = new Schema(
  {
    backgroundColor: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const MainColor = models.MainColor || model("MainColor", mainColorSchema);

export default MainColor;

MainColor.watch().on("change", async (data) => {
  if (data.operationType === "insert") {
    await User.findByIdAndUpdate(data.fullDocument.user, {
      maincolor: data.fullDocument._id,
    });
  }
});
