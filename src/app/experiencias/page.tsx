import { Metadata } from "next";
import { categoryProjects } from "@/data/categories";
import Header from "@/components/layout/Header";
import CategoryGrid from "@/components/project/CategoryGrid";
import GridWrapper from "@/components/layout/GridWrapper";

export const metadata: Metadata = {
  title: "Experiencias",
  description: "Immersive brand experiences, events, and activations that create lasting connections.",
  openGraph: {
    title: "Experiencias - Blacro Studio",
    description: "Immersive brand experiences, events, and activations that create lasting connections.",
  },
};

export const revalidate = 43200; // 12 hours

export default function ExperienciasPage() {
  return (
    <GridWrapper className="py-8">
      <main className="col-span-12 flex flex-col gap-3">
        <Header title="Experiencias" />
        <section className="pb-16">
          <CategoryGrid
            projects={categoryProjects.experiencias}
            category="experiencias"
          />
        </section>
      </main>
    </GridWrapper>
  );
}
