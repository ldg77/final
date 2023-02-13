import { Schema, model, models } from "mongoose";
import User from "./User";

const pageNameSchema = new Schema(
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

const PageName = models.PageName || model("PageName", pageNameSchema);

export default PageName;

PageName.watch().on("change", async (data) => {
  if (data.operationType === "insert") {
    await User.findByIdAndUpdate(data.fullDocument.user, {
      pagename: data.fullDocument._id,
    });
  }
});
