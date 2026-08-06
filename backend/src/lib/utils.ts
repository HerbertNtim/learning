import jwt from "jsonwebtoken";

export const generateToken = (userId: string, res: any) => {
  const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Use a default secret if not provided
  if(!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
  
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie 
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  });

  return token
}
