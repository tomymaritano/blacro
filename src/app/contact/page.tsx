// app/contact/page.tsx
import { Metadata } from "next";
import ContactClient from "@/components/forms/ContactClient";
import FormErrorBoundary from "@/components/common/FormErrorBoundary";
import GridWrapper from "@/components/layout/GridWrapper";

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
    <GridWrapper className="py-8">
      <main className="col-span-12 flex flex-col gap-3">
        <FormErrorBoundary>
          <ContactClient />
        </FormErrorBoundary>
      </main>
    </GridWrapper>
  );
}
