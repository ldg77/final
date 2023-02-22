import { Schema, model, models } from "mongoose";
import User from "./User";
import { findByIdUpdatePatch as userPatch } from "./User";

const TypeSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["blog", "shop"],
    },

    layoutitem: { type: {} },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Type = models.Type || model("Type", TypeSchema);

export const getAll = async () => {
  try {
    const type = await Type.find({});
    if (type.length) {
      return {
        approved: true,
        data: type,
        message: "type found",
      };
    } else {
      return {
        approved: false,
        message: "no type found",
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
    const type = await Type.create(obj);
    await userPatch(type.user, { type: type._id });
    return {
      approved: true,
      data: type,
      message: `new type width ${type._id} created`,
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
    const type = await Type.findById(id);

    if (type) {
      return {
        approved: true,
        data: type,
        message: "type found",
      };
    } else {
      return {
        approved: false,
        message: "no type found",
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
  try {
    return { approved: true, data: await Type.findByIdAndUpdate(id, obj) };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};
export const findByIdUpdatePatch = async (id: string, obj: object) => {
  try {
    const type = await findById(id);
    const updated = { ...type, ...obj };
    return {
      approved: true,
      data: await Type.findByIdAndUpdate(id, updated),
    };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

export const findByIdAndName = async (id: string, name: string) => {
  try {
    return {
      approved: true,
      data: await Type.findById(id, `layoutitem.${name}`),
    };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

export const findByIdAndNameAndUpdate = async (
  id: string,
  name: string,
  obj: object
) => {
  try {
    const type = await findById(id);

    const updated = {
      ...type.data.layoutitem,
      [name]: { ...obj },
    };

    return {
      approved: true,
      data: await Type.findByIdAndUpdate(id, { layoutitem: updated }),
    };
  } catch (error: any) {
    return {
      approved: false,
      message: error.message,
    };
  }
};

export default Type;
