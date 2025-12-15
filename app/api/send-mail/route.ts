import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    const msg = {
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: "Ваш код подтверждения",
      text: `Ваш код подтверждения: ${code}`,
      html: `<p>Ваш код подтверждения: <strong>${code}</strong></p>`,
    };

    await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log("[Send mail] is Fail", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
