import Employee from "../models/employee.model";

export const getAllEmployees = async () => {
  return await Employee.find();
};

export const getEmployeeById = async (id: string) => {
  return await Employee.findById(id);
};

export const createEmployee = async (employeeData: any) => {
  const employee = new Employee(employeeData);
  return await employee.save();
};

export const updateEmployee = async (
  id: string,
  employeeData: any
) => {
  return await Employee.findByIdAndUpdate(
    id,
    employeeData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteEmployee = async (id: string) => {
  return await Employee.findByIdAndDelete(id);
};