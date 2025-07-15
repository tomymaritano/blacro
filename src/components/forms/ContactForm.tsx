"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactSchema } from "../../app/lib/schemas/contactSchema";
import ContactFormFields from "./ContactFormFields";


/**
 * ContactForm - A comprehensive contact form component with validation and submission
 * 
 * Features:
 * - Real-time form validation with Zod schema
 * - Loading states during submission
 * - Error handling with user feedback
 * - Form reset after successful submission
 * - Responsive design
 * - Accessibility compliant
 * - Extended fields: name, email, company, website, social media, phone, country, project description
 * 
 * @component
 * @returns {React.JSX.Element} The rendered contact form
 * 
 * @example
 * ```tsx
 * <ContactForm />
 * ```
 * 
 * API Integration:
 * - Submits to `/api/contact` endpoint
 * - Handles rate limiting and server errors
 * - Displays appropriate success/error messages
 */
export default function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  /**
   * Handles form submission to the contact API
   * 
   * @async
   * @function onSubmit
   * @param {ContactSchema} data - The validated form data
   * @description 
   * - Sets loading state during submission
   * - Makes POST request to /api/contact
   * - Handles success/error responses
   * - Resets form on success
   * - Displays appropriate status messages
   */
  async function onSubmit(data: ContactSchema) {
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("¡Mensaje enviado exitosamente!");
        reset();
      } else {
        const { error } = await res.json();
        setStatus(error || "Error al enviar el mensaje.");
      }
    } catch {
      setStatus("Error al enviar el mensaje.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-sm sm:max-w-full md:max-w-full lg:max-w-2xl text-black/80 pr-2">
      <ContactFormFields register={register} errors={errors} />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center px-6 py-4 bg-black text-white rounded-3xl transition-colors text-lg font-sans font-semibold ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-black/80"
        }`}
      >
        {loading ? "Enviando..." : "Enviar Mensaje"}
      </button>

      {status && <p className="text-center mt-4 text-sm text-black/60 font-darker-grotesque">{status}</p>}
    </form>
  );
}