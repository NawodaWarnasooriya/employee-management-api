import { Request, Response } from "express";

export const departmentController = (
  req: Request,
  res: Response
) => {
  res.json({
    success: true,
    message: "Department controller is working",
  });
};