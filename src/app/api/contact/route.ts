import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { validateEnv } from "@/app/lib/env";
import { sanitizeText, sanitizeEmailHeader, checkRateLimit, getClientIP } from "@/app/lib/security";
import { contactSchema } from "@/app/lib/schemas/contactSchema";

export async function POST(request: Request) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP, 5, 15 * 60 * 1000); // 5 requests per 15 minutes
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: "Too many requests. Please try again later.",
          resetTime: rateLimitResult.resetTime 
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
          }
        }
      );
    }

    const data = await request.json();
    const { name, email, message } = contactSchema.parse(data);

    // Validate environment variables
    const env = validateEnv();

    // SMTP transporter configuration
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: env.SMTP_SECURE === "true",
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    });

    // Sanitize all inputs to prevent injection attacks
    const sanitizedName = sanitizeEmailHeader(name);
    const sanitizedEmail = sanitizeEmailHeader(email);
    const sanitizedMessage = sanitizeText(message);
    const sanitizedSubject = sanitizeEmailHeader(`New contact from ${name}`);

    // Send email with sanitized content
    await transporter.sendMail({
      from: `"${sanitizedName}" <${process.env.SMTP_USER}>`, // Use authenticated sender
      replyTo: sanitizedEmail, // Set reply-to to user's email
      to: "hola@blacro.com",
      subject: sanitizedSubject,
      text: sanitizedMessage,
      html: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Message:</strong><br>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This message was sent from the Blacro Studio contact form.</small></p>
      `,
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
        }
      }
    );

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      console.error("[CONTACT_API_ERROR]:", error.message, error.stack);
      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}