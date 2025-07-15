// app/contact/page.tsx
import { Metadata } from "next";
import ContactClient from "@/components/forms/ContactClient";
import FormErrorBoundary from "@/components/common/FormErrorBoundary";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's talk! Get in touch with Blacro Studio to discuss your project or idea.",
  openGraph: {
    title: "Contact Blacro Studio",
    images: "https://res.cloudinary.com/dm9driroe/image/upload/v1/og-contact",
  },
};

export default function ContactPage() {
  return (
    <FormErrorBoundary>
      <ContactClient />
    </FormErrorBoundary>
  );
}