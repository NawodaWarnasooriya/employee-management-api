import { Request, Response } from "express";

export const permissionController = (
  req: Request,
  res: Response
) => {
  res.json({
    success: true,
    message: "Permission controller is working",
  });
};