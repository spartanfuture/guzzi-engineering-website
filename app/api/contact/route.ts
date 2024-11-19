import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { verify } from "hcaptcha";

// Set config (TODO: Move all these to a config file with fallbacks)
const secretKey = process.env.HCAPTCHA_SECRET_KEY || "";
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, message, captcha } =
    await req.json();

  const msg = {
    to: "support@spartanfuture.com",
    from: process.env.EMAIL_FROM as string, // This needs to be a verified sender in SendGrid
    subject: "New Enquiry from Spartan Future Website",
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone || "Not provided"}
      Message: ${message}
    `,
    html: `
      <h2>New Enquiry from Spartan Future Website</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  };

  try {
    const token = captcha || null;
    if (!token) throw "Invalid captcha";
    const { success: captchaOk } = await verify(secretKey, token);
    if (!captchaOk) throw "Failed to verify captcha";

    await sgMail.send(msg);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: error || "Failed to send email" },
      { status: 500 }
    );
  }
}
