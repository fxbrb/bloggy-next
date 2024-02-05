import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { hash } from "bcrypt";

export async function POST(req: Request, context: any) {
  try {
    const body = await req.json();
    const { password } = body;
    const { params } = context;

    if (!password) {
      return NextResponse.json(
        {
          message: "Vous devez entrer un mot de passe",
        },
        { status: 409 }
      );
    }

    const token = await prisma.token.findUnique({
      where: {
        token: params.token,
      },
      include: {
        user: true,
      },
    });

    if (!token) {
      return NextResponse.json(
        {
          message: "Token invalide, veuillez faire une nouvelle demande",
        },
        { status: 409 }
      );
    }
    const decodedToken = jwt.verify(token.token, process.env.JWT_SECRET_KEY!, {
      ignoreExpiration: true,
    }) as JwtPayload;

    const expirationDate = decodedToken.exp
      ? new Date(decodedToken.exp * 1000)
      : null;
    if (expirationDate && expirationDate < new Date()) {
      await prisma.token.delete({
        where: {
          id: token.id,
        },
      });
      return NextResponse.json(
        {
          message: "Le token a expiré, veuillez faire une nouvelle demande",
        },
        { status: 409 }
      );
    }

    if (token.type !== "password_reset") {
      await prisma.token.delete({
        where: {
          id: token.id,
        },
      });
      return NextResponse.json(
        {
          message: "Type de token invalide",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.update({
      where: {
        id: decodedToken.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.token.delete({
      where: {
        id: token.id,
      },
    });

    return NextResponse.json(
      { message: "Votre mot de passe a été modifier avec succès." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
