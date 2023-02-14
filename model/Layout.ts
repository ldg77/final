import { Schema, model, models } from "mongoose";
import User from "./User";

const layoutSchema = new Schema(
  {
    layouts: Object,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Layout = models.Layout || model("Layout", layoutSchema);

export default Layout;

Layout.watch().on("change", async (data) => {
  if (data.operationType === "insert") {
    await User.findByIdAndUpdate(data.fullDocument.user, {
      layout: data.fullDocument._id,
    });
  }
});
