import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { isLocale, LOCALE_COOKIE } from "@/i18n/config";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const locale = typeof body === "object" && body !== null && "locale" in body && typeof body.locale === "string" ? body.locale : undefined;

    if (!isLocale(locale)) {
      return NextResponse.json({ error: "Unsupported locale." }, { status: 400 });
    }

    (await cookies()).set(LOCALE_COOKIE, locale, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ locale });
  } catch (error) {
    console.error("Could not update locale.", error);
    return NextResponse.json({ error: "Could not update locale." }, { status: 400 });
  }
}
