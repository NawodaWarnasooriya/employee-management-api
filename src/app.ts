import express from "express";

import employeeRoutes from "./routes/employee.routes";
import authenticationRoutes from "./routes/authentication.routes";
import permissionRoutes from "./routes/permission.routes";
import roleRoutes from "./routes/role.routes";
import departmentRoutes from "./routes/department.routes";

const app = express();

app.use(express.json());

app.use("/api/employees", employeeRoutes);

app.use("/api/authentication", authenticationRoutes);

app.use("/api/permissions", permissionRoutes);

app.use("/api/roles", roleRoutes);

app.use("/api/departments", departmentRoutes);

export default app;