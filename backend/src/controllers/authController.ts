import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { SignupTypes } from "../types/type";
import User from "../models/User";
import { generateToken } from "../lib/utils";

export const Signup = async (req: Request, res: Response) => {
  const { username, email, password } = (req.body as unknown as SignupTypes) || ({} as SignupTypes);

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure we can safely check length whether password is a string or number
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

     // check if emails valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id.toString(), res); // Assuming generateToken is defined elsewhere

      res.status(201).json({ message: "User created successfully", user: savedUser });
    }
  } catch (error) {
    
  }
}
