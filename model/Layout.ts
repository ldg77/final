import { Schema, model, models } from "mongoose";
import User from "./User";
import { findByIdUpdatePatch as userPatch } from "./User";

const LayoutSchema = new Schema(
  {
    layouts: Object,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Layout = models.Layout || model("Layout", LayoutSchema);

export const getAll = async () => {
  try {
    const layouts = await Layout.find({});
    if (layouts.length) {
      return {
        approved: true,
        data: layouts,
        message: "layouts founded",
      };
    } else {
      return {
        approved: false,
        message: "no layouts found",
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
    const newLayout = await Layout.create(obj);
    await userPatch(newLayout.user, { layout: newLayout._id });
    return {
      approved: true,
      data: newLayout,
      message: `new maincolor width ${newLayout._id} created`,
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
    const layout = await Layout.findById(id);

    if (layout) {
      return {
        approved: true,
        data: layout,
        message: "layout found",
      };
    } else {
      return {
        approved: false,
        message: "no layouts found",
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
  return await Layout.findByIdAndUpdate(id, obj);
};
export const findByIdUpdatePatch = async (id: string, obj: object) => {
  const user = await findById(id);
  const updated = { ...user, ...obj };

  return await Layout.findByIdAndUpdate(id, updated);
};

export const updateAllLayoutItemsPut = async (
  layoutId: string,
  itemId: string,
  value: object
) => {
  const layout = await findById(layoutId);

  if (layout.approved) {
    const modefied = Object.keys(layout.data.layouts).reduce((acc: any, el) => {
      acc[el] = layout.data.layouts[el].map((item: any) =>
        item.i === itemId ? value : item
      );
      return acc;
    }, {});

    return {
      approved: true,
      data: await Layout.findByIdAndUpdate(layoutId, modefied),
      message: "layout updated",
    };
  } else {
    return {
      approved: false,
      message: "layout not found",
    };
  }
};

export const updateAllLayoutItemsPatch = async (
  layoutId: string,
  itemId: string,
  value: object
) => {
  const layout = await findById(layoutId);

  if (layout.approved) {
    const modefied = Object.keys(layout.data.layouts).reduce((acc: any, el) => {
      acc[el] = layout.data.layouts[el].map((item: any) =>
        item.i === itemId ? { ...layout.data, ...value } : item
      );
      return acc;
    }, {});

    return {
      approved: true,
      data: await Layout.findByIdAndUpdate(layoutId, modefied),
      message: "layout updated",
    };
  } else {
    return {
      approved: false,
      message: "layout not found",
    };
  }
};
Layout.watch().on("change", async (data) => {
  if (data.operationType === "insert") {
    await User.findByIdAndUpdate(data.fullDocument.user, {
      layout: data.fullDocument._id,
    });
  }
});

export default Layout;
