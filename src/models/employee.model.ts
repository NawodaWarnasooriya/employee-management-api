import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: "ACTIVE" | "INACTIVE";
}

const employeeSchema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
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

const Employee = mongoose.model<IEmployee>(
  "Employee",
  employeeSchema
);

export default Employee;