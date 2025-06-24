import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// 1. Esquema para los campos esperados
const ContactSchema = z.object({
  name: z.string().min(2, "El nombre es demasiado corto."),
  email: z.string().email("Email inválido."),
  message: z.string().min(10, "El mensaje es demasiado corto."),
});

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 2. Validar los campos contra el esquema
    const { name, email, message } = ContactSchema.parse(data);

    // 3. Configuración del transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 4. Enviar el mail
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

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    // 5. Manejo de errores
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    console.error("[CONTACT_API_ERROR]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}