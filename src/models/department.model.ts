import mongoose, { Document, Schema } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  description?: string;
  status: "ACTIVE" | "INACTIVE";
}

const departmentSchema = new Schema<IDepartment>(
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

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model<IDepartment>(
  "Department",
  departmentSchema
);

export default Department;