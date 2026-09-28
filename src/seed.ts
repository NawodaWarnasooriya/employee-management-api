import dotenv from "dotenv";
import { connectDB } from "./config/database";
import Employee from "./models/employee.model";

dotenv.config();

const addEmployee = async () => {
  try {
    await connectDB();

    const employee = await Employee.create({
      name: "John Doe",
      email: "john@example.com",
      phone: "0771234567",
      department: "IT",
      position: "Software Engineer",
      status: "ACTIVE",
    });

    console.log("Employee added successfully:");
    console.log(employee);

    process.exit(0);
  } catch (error) {
    console.error("Failed to add employee:", error);
    process.exit(1);
  }
};

addEmployee();