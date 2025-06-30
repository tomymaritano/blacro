"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Zod schema for contact form validation
 * @constant
 */
const contactSchema = z.object({
  name: z.string().min(2, "Tu nombre es muy corto"),
  email: z.string().email("Email inválido"),
  company: z.string().min(2, "El nombre de la compañía es muy corto"),
  website: z.string().url("Ingresa una URL válida").optional().or(z.literal("")),
  socialMedia: z.string().optional(),
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
            className={`px-4 py-3 w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] ${
              errors.name ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-sm font-medium text-black/80 uppercase">
            EMAIL *
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="tu@email.com"
            className={`px-4 py-3 w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] ${
              errors.email ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
        </div>
      </div>

      {/* Row 2: Company and Website */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="company" className="mb-2 text-sm font-medium text-black/80 uppercase">
            COMPAÑÍA *
          </label>
          <input
            id="company"
            {...register("company")}
            placeholder="Nombre de tu compañía"
            className={`px-4 py-3 w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] ${
              errors.company ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.company && <span className="text-xs text-red-500 mt-1">{errors.company.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="website" className="mb-2 text-sm font-medium text-black/80 uppercase">
            SITIO WEB
          </label>
          <input
            id="website"
            type="url"
            {...register("website")}
            placeholder="https://tusitio.com"
            className={`px-4 py-3 w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] ${
              errors.website ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.website && <span className="text-xs text-red-500 mt-1">{errors.website.message}</span>}
        </div>
      </div>

      {/* Row 3: Social Media and Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="socialMedia" className="mb-2 text-sm font-medium text-black/80 uppercase">
            REDES SOCIALES
          </label>
          <input
            id="socialMedia"
            {...register("socialMedia")}
            placeholder="@tuusuario o URL del perfil"
            className={`px-4 py-3 w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] ${
              errors.socialMedia ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.socialMedia && <span className="text-xs text-red-500 mt-1">{errors.socialMedia.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-2 text-sm font-medium text-black/80 uppercase">
            TELÉFONO *
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="+54 (11) 1234-5678"
            className={`px-4 py-3 w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] ${
              errors.phone ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.phone && <span className="text-xs text-red-500 mt-1">{errors.phone.message}</span>}
        </div>
      </div>

      {/* Row 4: Country */}
      <div className="flex flex-col">
        <label htmlFor="country" className="mb-2 text-sm font-medium text-black/80 uppercase">
          PAÍS *
        </label>
        <select
          id="country"
          {...register("country")}
          className={`px-4 py-3 w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] ${
            errors.country ? "border-red-500" : "border-black/20"
          }`}
        >
          <option value="">Selecciona tu país</option>
          <option value="AR">Argentina</option>
          <option value="US">Estados Unidos</option>
          <option value="CA">Canadá</option>
          <option value="GB">Reino Unido</option>
          <option value="DE">Alemania</option>
          <option value="FR">Francia</option>
          <option value="ES">España</option>
          <option value="IT">Italia</option>
          <option value="BR">Brasil</option>
          <option value="MX">México</option>
          <option value="CO">Colombia</option>
          <option value="CL">Chile</option>
          <option value="PE">Perú</option>
          <option value="UY">Uruguay</option>
          <option value="AU">Australia</option>
          <option value="JP">Japón</option>
          <option value="KR">Corea del Sur</option>
          <option value="IN">India</option>
          <option value="CN">China</option>
          <option value="OTHER">Otro</option>
        </select>
        {errors.country && <span className="text-xs text-red-500 mt-1">{errors.country.message}</span>}
      </div>

      {/* Row 5: Project Description */}
      <div className="flex flex-col">
        <label htmlFor="projectDescription" className="mb-2 text-sm font-medium text-black/80 uppercase">
          CONTANOS SOBRE TU PROYECTO *
        </label>
        <textarea
          id="projectDescription"
          {...register("projectDescription")}
          rows={6}
          placeholder="Describe tu proyecto, objetivos, cronograma y cualquier requerimiento específico..."
          className={`px-4 py-3 w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-black/30 resize-none bg-[#F8F8F8] ${
            errors.projectDescription ? "border-red-500" : "border-black/20"
          }`}
        ></textarea>
        {errors.projectDescription && <span className="text-xs text-red-500 mt-1">{errors.projectDescription.message}</span>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center px-6 py-4 bg-black text-white font-medium rounded-full transition-colors text-lg ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-black/80"
        }`}
      >
        {loading ? "Enviando..." : "Enviar Mensaje"}
      </button>

      {status && <p className="text-center mt-4 text-sm text-black/60">{status}</p>}
    </form>
  );
}