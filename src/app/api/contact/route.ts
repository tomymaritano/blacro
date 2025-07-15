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
    const { 
      name, 
      email, 
      company, 
      websiteSocial, 
      phone, 
      country, 
      projectDescription 
    } = contactSchema.parse(data);

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
    const sanitizedCompany = sanitizeEmailHeader(company);
    const sanitizedWebsiteSocial = websiteSocial ? sanitizeText(websiteSocial) : "";
    const sanitizedPhone = sanitizeText(phone);
    const sanitizedCountry = sanitizeText(country);
    const sanitizedProjectDescription = sanitizeText(projectDescription);
    const sanitizedSubject = sanitizeEmailHeader(`New contact from ${name} (${company})`);

    // Send email with sanitized content
    await transporter.sendMail({
      from: `"Blacro Studio" <hola@blacro.com>`, // Use verified sender email
      replyTo: sanitizedEmail, // Set reply-to to user's email
      to: "hola@blacro.com",
      subject: sanitizedSubject,
      text: `
New Contact Form Submission

Contact Information:
- Name: ${sanitizedName}
- Email: ${sanitizedEmail}
- Company: ${sanitizedCompany}
- Phone: ${sanitizedPhone}
- Country: ${sanitizedCountry}

Additional Information:
- Website/Social Media: ${sanitizedWebsiteSocial || 'Not provided'}

Project Description:
${sanitizedProjectDescription}

---
This message was sent from the Blacro Studio contact form.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f8f8; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
            <p><strong>Company:</strong> ${sanitizedCompany}</p>
            <p><strong>Phone:</strong> <a href="tel:${sanitizedPhone}">${sanitizedPhone}</a></p>
            <p><strong>Country:</strong> ${sanitizedCountry}</p>
          </div>

          <div style="background-color: #f0f0f0; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Additional Information</h3>
            <p><strong>Website/Social Media:</strong> ${sanitizedWebsiteSocial ? 
              (sanitizedWebsiteSocial.startsWith('http') ? 
                `<a href="${sanitizedWebsiteSocial}" target="_blank">${sanitizedWebsiteSocial}</a>` : 
                sanitizedWebsiteSocial) : 
              'Not provided'}</p>
          </div>

          <div style="background-color: #fff; padding: 20px; margin: 20px 0; border: 1px solid #ddd; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Project Description</h3>
            <p style="line-height: 1.6;">${sanitizedProjectDescription.replace(/\n/g, '<br>')}</p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            This message was sent from the Blacro Studio contact form.<br>
            Received on ${new Date().toLocaleString()}
          </p>
        </div>
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