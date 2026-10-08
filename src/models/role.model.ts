import mongoose, { Document, Schema } from "mongoose";

export interface IRole extends Document {
  name: string;
  description?: string;
  permissions: mongoose.Types.ObjectId[];
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model<IRole>("Role", roleSchema);

export default Role;