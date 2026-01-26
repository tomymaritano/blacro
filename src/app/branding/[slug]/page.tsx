import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categoryProjects } from "@/data/categories";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectInfo from "@/components/project/ProjectInfo";
import ProjectImageGrid from "@/components/project/ProjectImageGrid";
import GridWrapper from "@/components/layout/GridWrapper";

const projects = categoryProjects.branding;

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} - Blacro Studio`,
      description: project.description,
    },
  };
}

export const revalidate = 3600; // 1 hour

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Default metadata if project doesn't have custom ones
  const defaultMetadata = [
    { label: "Categoría", value: "Branding" },
    { label: "Servicios", value: "Identidad Visual" },
    { label: "Año", value: "2024" },
    { label: "Cliente", value: project.title },
  ];

  const metadata = project.metadata || defaultMetadata;
  const description = project.longDescription || project.description;

  return (
    <>
      {/* Hero OUTSIDE GridWrapper - Full bleed */}
      <ProjectHero imageSrc={project.headerImage} title={project.heroTitle || project.title} />

      {/* Content INSIDE GridWrapper */}
      <GridWrapper className="py-8">
        <main className="col-span-12 flex flex-col gap-3">
          {/* Project Info Section */}
          <ProjectInfo metadata={metadata} description={description} />
        </main>
      </GridWrapper>

      {/* Grid OUTSIDE GridWrapper for full-bleed */}
      <ProjectImageGrid
        images={project.images}
        gridType={project.gridType || "masonry"}
        gridLayout={project.gridLayout}
        projectTitle={project.title}
      />
    </>
  );
}
