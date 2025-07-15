"use client";

import { useMemo } from "react";
import { getData } from "country-list";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ContactSchema } from "../../app/lib/schemas/contactSchema";

interface CountrySelectorProps {
  register: UseFormRegister<ContactSchema>;
  errors: FieldErrors<ContactSchema>;
}

export default function CountrySelector({ register, errors }: CountrySelectorProps) {
  // Memoized countries to prevent re-calculation
  const countries = useMemo(() => getData(), []);

  return (
    <div className="flex flex-col">
      <label htmlFor="country" className="mb-2 text-sm font-medium text-black/80 uppercase font-darker-grotesque">
        PAÍS *
      </label>
      <select
        id="country"
        {...register("country")}
        className={`px-4 py-3 w-full border rounded-none focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] font-sans ${
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
  );
}