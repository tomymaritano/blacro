import { Metadata } from "next";
import { categoryProjects } from "@/data/categories";
import Header from "@/components/layout/Header";
import CategoryGrid from "@/components/project/CategoryGrid";
import GridWrapper from "@/components/layout/GridWrapper";

export const metadata: Metadata = {
  title: "Espacios",
  description: "Spatial design, exhibition spaces, and environmental branding that transform places.",
  openGraph: {
    title: "Espacios - Blacro Studio",
    description: "Spatial design, exhibition spaces, and environmental branding that transform places.",
  },
};

export const revalidate = 43200; // 12 hours

export default function EspaciosPage() {
  return (
    <GridWrapper className="py-8">
      <main className="col-span-12 flex flex-col gap-3">
        <Header title="Espacios" />
        <section className="pb-16">
          <CategoryGrid
            projects={categoryProjects.espacios}
            category="espacios"
          />
        </section>
      </main>
    </GridWrapper>
  );
}
