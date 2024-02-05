import { prisma } from "@/lib/db";
import { generateToken } from "@/lib/generateToken";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import ForgotPasswordEmail from "../../../../react-email-starter/emails/forgot-password-link";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          message: "Vous devez entrer un email",
        },
        { status: 409 }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Aucun utilisateur est inscrit avec ce mail",
        },
        { status: 409 }
      );
    }

    if (!user.password?.length) {
      return NextResponse.json(
        {
          message:
            "Impossible de changer votre mot de passe, ce mail est utilisé pour la connexion avec google",
        },
        { status: 409 }
      );
    }

    const token = generateToken(user.id);

    await prisma.token.create({
      data: {
        type: "password_reset",
        token,
        userId: user.id,
      },
    });

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Changement du mot de passe",
      react: ForgotPasswordEmail({
        firstName: user.firstname,
        link: `http://localhost:3000/reset-password/${encodeURIComponent(
          token
        )}`,
      }) as React.ReactElement,
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json(
      {
        message:
          "Un e-mail contenant un lien de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Forgot password server error" },
      { status: 500 }
    );
  }
}
