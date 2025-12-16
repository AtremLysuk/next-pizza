import sgMail from "@sendgrid/mail";
import {NextRequest, NextResponse} from "next/server";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const {email, code} = await req.json();

    await sgMail.send({
      to: email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!, // ✅ обязательно !
        name: "Next Pizza 🍕",
      },
      subject: "Ваш код подтверждения",
      text: `Ваш код подтверждения: ${code}`,
      html: `<p>Ваш код подтверждения: <strong>${code}</strong></p>`,
    });

    return NextResponse.json({success: true});
  } catch (error: any) {
    console.log("[Send mail] is Fail", error?.response?.body || error);
    return NextResponse.json(
      {error: "Failed to send email"},
      {status: 500}
    );
  }
}

