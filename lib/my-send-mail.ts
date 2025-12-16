import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);


export async function mySemdMail(
  to: string,
  template: { subject: string; html: string }
) {
  try {
    await sgMail.send({

      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: "Next Pizza 🍕",
      },
      to: to,
      subject: template.subject,
      html: template.html,
      text: template.html.replace(/<[^>]+>/g, ""),
    });

    return {success: true};
  } catch (error: any) {
    console.log("SendGrid error:", error.response?.body || error);

    return {success: false};
  }
}
