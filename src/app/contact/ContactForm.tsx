"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Your name is too short"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Your message is too short"),
});

type ContactFormData = z.infer<typeof contactSchema>;

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
        setStatus("Message sent successfully!");
        reset();
      } else {
        const { error } = await res.json();
        setStatus(error || "Error sending the message.");
      }
    } catch {
      setStatus("Error sending the message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm sm:max-w-full md:max-w-full lg:max-w-xl text-black/80 px-2">
      {/* Nombre */}
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 text-sm font-medium text-black/80">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          placeholder="Your full name"
          className={`px-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] ${
            errors.name ? "border-red-500" : "border-black/20"
          }`}
        />
        {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 text-sm font-medium text-black/80">
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          placeholder="you@example.com"
          className={`px-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8] ${
            errors.email ? "border-red-500" : "border-black/20"
          }`}
        />
        {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
      </div>

      {/* Mensaje */}
      <div className="flex flex-col">
        <label htmlFor="message" className="mb-2 text-sm font-medium text-black/80">
          Your Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={5}
          placeholder="Tell us about your project or idea..."
          className={`px-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 resize-none bg-[#F8F8F8] ${
            errors.message ? "border-red-500" : "border-black/20"
          }`}
        ></textarea>
        {errors.message && <span className="text-xs text-red-500 mt-1">{errors.message.message}</span>}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center px-6 py-3 bg-black text-white font-medium rounded-full transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-black/80"
        }`}
      >
        {loading ? "Sending..." : "Send"}
      </button>

      {status && <p className="text-center mt-2 text-sm text-black/60">{status}</p>}
    </form>
  );
}