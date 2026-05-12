import { Resend } from "resend";

export const runtime = "nodejs";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// simple in-memory rate limit (works only per instance)
const requestCounts: { [ip: string]: { count: number; timestamp: number } } = {};
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 1000;

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Missing RESEND_API_KEY" }),
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const clientIp =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";

  const now = Date.now();

  if (requestCounts[clientIp]) {
    const { count, timestamp } = requestCounts[clientIp];

    if (now - timestamp < RATE_LIMIT_WINDOW) {
      if (count >= RATE_LIMIT) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Try later." }),
          { status: 429 }
        );
      }
      requestCounts[clientIp].count += 1;
    } else {
      requestCounts[clientIp] = { count: 1, timestamp: now };
    }
  } else {
    requestCounts[clientIp] = { count: 1, timestamp: now };
  }

  const body = (await req.json()) as FormData;
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return new Response(
      JSON.stringify({ error: "All fields are required" }),
      { status: 400 }
    );
  }

  const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email address" }),
      { status: 400 }
    );
  }

  const sanitizedName = name.replace(/[<>]/g, "");
  const sanitizedSubject = subject.replace(/[<>]/g, "");
  const sanitizedMessage = message.replace(/[<>]/g, "");

  try {
    const { error } = await resend.emails.send({
      from: "Contact Form <no-reply@ashlok.dev>",
      to: "chaudharyashlok@gmail.com",
      replyTo: email,
      subject: sanitizedSubject,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${sanitizedSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: "Email send failed" }),
        { status: 500 }
      );
    }

    return Response.json({ message: "Message sent successfully" });
  } catch {
  return new Response(
    JSON.stringify({ error: "Server error sending email" }),
    { status: 500 }
  );
  }
}