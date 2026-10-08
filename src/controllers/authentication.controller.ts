import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import crypto from "crypto";

// =========================
// Register
// =========================

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, department } = req.body;

    // Required field validation
    if (!name || !email || !password || !role || !department) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      department,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    // Duplicate email handling
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

// =========================
// Login
// =========================

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Required field validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        department: user.department,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    // Login successful
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// =========================
// Logout
// =========================

export const logout = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

// =========================
// Forgot Password
// =========================

export const forgotPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    // Check email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Set token expiry to 15 minutes
    const resetTokenExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    // Save reset token and expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset token generated successfully",
      resetToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Password recovery failed",
    });
  }
};

// =========================
// Reset Password
// =========================

export const resetPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { token, newPassword } = req.body;

    // Check required fields
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }

    // Check password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Find user using reset token
    // Token must not be expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    // Check token
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    // Update password
    user.password = hashedPassword;

    // Remove reset token after successful reset
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Password reset failed",
    });
  }
};