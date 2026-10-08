import { Request, Response } from "express";

export const roleController = (
  req: Request,
  res: Response
) => {
  res.json({
    success: true,
    message: "Role controller is working",
  });
};