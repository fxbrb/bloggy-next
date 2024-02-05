import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const getAuthSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const getRequiredAuthSession = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }
  return session;
};
