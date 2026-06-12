import { NextResponse } from "next/server";
import { newsletterSchema } from "@/types/shopify";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Veuillez saisir une adresse email valide." },
        { status: 400 },
      );
    }

    // Brancher ici un vrai service d'emailing (Klaviyo, Shopify, Resend…).
    return NextResponse.json({ ok: true, email: parsed.data.email });
  } catch {
    return NextResponse.json(
      { message: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 },
    );
  }
}
