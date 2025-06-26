import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Valida los campos del formulario
const ContactSchema = z.object({
  name: z.string().min(2, "El nombre es demasiado corto."),
  email: z.string().email("Email inválido."),
  message: z.string().min(10, "El mensaje es demasiado corto."),
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = ContactSchema.parse(data);

    // Loguear envs para depuración
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('SMTP_SECURE:', process.env.SMTP_SECURE);
    console.log('SMTP_USER:', process.env.SMTP_USER);

    // Configuración del transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Enviar mail
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "hola@blacro.com",
      subject: `New contact from ${name}`,
      text: message,
      html: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
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