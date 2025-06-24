// app/contact/page.tsx
import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's talk! Get in touch with Blacro Studio to discuss your project or idea.",
  openGraph: {
    title: "Contact Blacro Studio",
    images: "/images/og-contact.png",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactClient />
    </>
  );
}