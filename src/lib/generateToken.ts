import jwt from "jsonwebtoken";

export function generateToken(userId: string) {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET_KEY!, {
    expiresIn: 1 * 60,
  });

  return token;
}
