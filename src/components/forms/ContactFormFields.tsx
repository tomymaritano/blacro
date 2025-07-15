"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ContactSchema } from "../../app/lib/schemas/contactSchema";
import dynamic from "next/dynamic";

// Lazy load the heavy country selector
const CountrySelector = dynamic(() => import("./CountrySelector"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-medium text-black/80 uppercase font-darker-grotesque">
        PAÍS *
      </label>
      <div className="px-4 py-3 w-full border rounded-none bg-[#F8F8F8] border-black/20 animate-pulse">
        Cargando países...
      </div>
    </div>
  ),
});

interface ContactFormFieldsProps {
  register: UseFormRegister<ContactSchema>;
  errors: FieldErrors<ContactSchema>;
}

export default function ContactFormFields({ register, errors }: ContactFormFieldsProps) {
  return (
    <>
      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-sm font-medium text-black/80 uppercase font-darker-grotesque">
            NOMBRE *
          </label>
          <input
            id="name"
            {...register("name")}
            placeholder="Tu nombre completo"
            className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] font-sans ${
              errors.name ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.name && <span className="text-xs text-red-500 mt-1 font-darker-grotesque">{errors.name.message}</span>}
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
            className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] font-sans ${
              errors.email ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.email && <span className="text-xs text-red-500 mt-1 font-darker-grotesque">{errors.email.message}</span>}
        </div>
      </div>

      {/* Row 2: Company and Website/Social Media */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label htmlFor="company" className="mb-2 text-sm font-medium text-black/80 uppercase font-darker-grotesque">
            COMPAÑÍA *
          </label>
          <input
            id="company"
            {...register("company")}
            placeholder="Nombre de tu compañía"
            className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] font-sans ${
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
            className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] font-sans ${
              errors.websiteSocial ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.websiteSocial && <span className="text-xs text-red-500 mt-1 font-darker-grotesque">{errors.websiteSocial.message}</span>}
        </div>
      </div>

      {/* Row 3: Phone and Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-2 text-sm font-medium text-black/80 uppercase font-darker-grotesque">
            TELÉFONO *
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="+54 (11) 1234-5678"
            className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] font-sans ${
              errors.phone ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.phone && <span className="text-xs text-red-500 mt-1 font-darker-grotesque">{errors.phone.message}</span>}
        </div>

        <CountrySelector register={register} errors={errors} />
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
          className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 resize-none bg-[#F8F8F8] font-sans ${
            errors.projectDescription ? "border-red-500" : "border-black/20"
          }`}
        />
        {errors.projectDescription && <span className="text-xs text-red-500 mt-1 font-darker-grotesque">{errors.projectDescription.message}</span>}
      </div>
    </>
  );
}