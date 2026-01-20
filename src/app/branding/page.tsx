import { Metadata } from "next";
import { categoryProjects } from "@/data/categories";
import Header from "@/components/layout/Header";
import CategoryGrid from "@/components/project/CategoryGrid";
import GridWrapper from "@/components/layout/GridWrapper";

export const metadata: Metadata = {
  title: "Branding",
  description: "Brand identity, visual systems, and strategic design that define memorable brands.",
  openGraph: {
    title: "Branding - Blacro Studio",
    description: "Brand identity, visual systems, and strategic design that define memorable brands.",
  },
};

export const revalidate = 43200; // 12 hours

export default function BrandingPage() {
  return (
    <GridWrapper className="py-8">
      <main className="col-span-12 flex flex-col gap-3">
        <Header title="Branding" />
        <section className="pb-16">
          <CategoryGrid
            projects={categoryProjects.branding}
            category="branding"
          />
        </section>
      </main>
    </GridWrapper>
  );
}
