"use client";

import Header from "../components/Layout/Header";
import ProjectCarouselRow from "../project/ProjectCardCarouselRow";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const { error } = await res.json();
        setStatus(error || "Error sending the message.");
      }
    } catch {
      setStatus("Error sending the message.");
    }
  }

  return (
    <>
      <section
        className="
          grid grid-cols-12 w-full items-start
          gap-8 lg:gap-12 mt-8 md:mt-12 lg:mt-20 mb-6 md:mb-30
          px-4 sm:px-8
        "
      >
        {/* Columna izquierda: encabezado */}
        <motion.div
          className="col-span-12 lg:col-span-6 flex flex-col"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Header title="Let's Talk" className="!mt-0 !mb-0" />
        </motion.div>

        {/* Columna derecha: formulario */}
        <motion.div
          className="col-span-12 lg:col-span-6 mt-6 lg:mt-0 flex flex-col items-center lg:items-end w-full"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl text-black/80">
            {/* Nombre */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-medium text-black/80">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
                className="px-4 py-3 w-full border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8]"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-sm font-medium text-black/80">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="you@example.com"
                className="px-4 py-3 w-full border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 bg-[#F8F8F8]"
              />
            </div>

            {/* Mensaje */}
            <div className="flex flex-col">
              <label htmlFor="message" className="mb-2 text-sm font-medium text-black/80">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
                placeholder="Tell us about your project or idea..."
                className="px-4 py-3 w-full border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 resize-none bg-[#F8F8F8]"
              ></textarea>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-black/80 transition-colors"
            >
              Send
            </button>

            {status && (
              <p className="text-center mt-2 text-sm text-black/60">{status}</p>
            )}
          </form>
        </motion.div>
      </section>

      <ProjectCarouselRow />
    </>
  );
}