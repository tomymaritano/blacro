"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getData } from "country-list";

/**
 * Zod schema for contact form validation
 * @constant
 */
const contactSchema = z.object({
  name: z.string().min(2, "Tu nombre es muy corto"),
  email: z.string().email("Email inválido"),
  company: z.string().min(2, "El nombre de la compañía es muy corto"),
  websiteSocial: z.string().optional(),
  phone: z.string().min(10, "El número de teléfono es muy corto"),
  country: z.string().min(2, "Por favor selecciona un país"),
  projectDescription: z.string().min(20, "Por favor proporciona más detalles sobre tu proyecto"),
});

/**
 * Type definition for contact form data
 * @typedef {Object} ContactFormData
 */
type ContactFormData = z.infer<typeof contactSchema>;

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
  
  // Get all countries from country-list library
  const countries = getData();

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  /**
   * Handles form submission to the contact API
   * 
   * @async
   * @function onSubmit
   * @param {ContactFormData} data - The validated form data
   * @description 
   * - Sets loading state during submission
   * - Makes POST request to /api/contact
   * - Handles success/error responses
   * - Resets form on success
   * - Displays appropriate status messages
   */
  async function onSubmit(data: ContactFormData) {
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
      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-sm font-medium text-black/80 uppercase">
            NOMBRE *
          </label>
          <input
            id="name"
            {...register("name")}
            placeholder="Tu nombre completo"
            className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] font-darker-grotesque ${
              errors.name ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.name && <span className="text-xs text-red-500 mt-1 font-darker">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-sm font-medium text-black/80 uppercase font-darker-grotesque">
            EMAIL *
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="tu@email.com"
            className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] font-darker-grotesque ${
              errors.email ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.email && <span className="text-xs text-red-500 mt-1 font-darker-grotesque">{errors.email.message}</span>}
        </div>
      </div>

      {/* Row 2: Company and Website/Social Media */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="company" className="mb-2 text-sm font-medium text-black/80 uppercase font-darker-grotesque">
            COMPAÑÍA *
          </label>
          <input
            id="company"
            {...register("company")}
            placeholder="Nombre de tu compañía"
            className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] font-darker-grotesque ${
              errors.company ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.company && <span className="text-xs text-red-500 mt-1 font-darker-grotesque">{errors.company.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="websiteSocial" className="mb-2 text-sm font-medium text-black/80 uppercase font-darker-grotesque">
            WEBSITE - SOCIAL MEDIA
          </label>
          <input
            id="websiteSocial"
            {...register("websiteSocial")}
            placeholder="https://tusitio.com o @tuusuario"
            className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] font-darker-grotesque ${
              errors.websiteSocial ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.websiteSocial && <span className="text-xs text-red-500 mt-1 font-darker-grotesque">{errors.websiteSocial.message}</span>}
        </div>
      </div>

      {/* Row 3: Phone and Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-2 text-sm font-medium text-black/80 uppercase font-darker-grotesque">
            TELÉFONO *
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="+54 (11) 1234-5678"
            className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] font-darker-grotesque ${
              errors.phone ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.phone && <span className="text-xs text-red-500 mt-1 font-darker-grotesque">{errors.phone.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="country" className="mb-2 text-sm font-medium text-black/80 uppercase font-darker-grotesque">
            PAÍS *
          </label>
          <select
            id="country"
            {...register("country")}
            className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] font-darker-grotesque ${
              errors.country ? "border-red-500" : "border-black/20"
            }`}
          >
            <option value="">Selecciona tu país</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <span className="text-xs text-red-500 mt-1 font-darker-grotesque">{errors.country.message}</span>}
        </div>
      </div>


      {/* Row 4: Project Description */}
      <div className="flex flex-col">
        <label htmlFor="projectDescription" className="mb-2 text-sm font-medium text-black/80 uppercase font-darker-grotesque">
          CONTANOS SOBRE TU PROYECTO *
        </label>
        <textarea
          id="projectDescription"
          {...register("projectDescription")}
          rows={6}
          placeholder="Describe tu proyecto, objetivos, cronograma y cualquier requerimiento específico..."
          className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 resize-none bg-[#F8F8F8] font-darker-grotesque ${
            errors.projectDescription ? "border-red-500" : "border-black/20"
          }`}
        ></textarea>
        {errors.projectDescription && <span className="text-xs text-red-500 mt-1 font-darker-grotesque">{errors.projectDescription.message}</span>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center px-6 py-4 bg-black text-white font-medium rounded-3xl transition-colors text-lg font-darker-grotesque ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-black/80"
        }`}
      >
        {loading ? "Enviando..." : "Enviar Mensaje"}
      </button>

      {status && <p className="text-center mt-4 text-sm text-black/60 font-darker-grotesque">{status}</p>}
    </form>
  );
}