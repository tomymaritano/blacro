import { projects } from "../../../../data/projects";
import Header from "../../components/Layout/Header";
import ProjectGallery from "../ProjectGallery";
import ProjectMetaInfo from "../ProjectMetaInfo";
import ProjectDescription from "../ProjectDescription";
import ProjectContentBlocks from "../ProjectContentBlocks";
import Image from "next/image";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Fijate que solo recibimos { params } sin tipo a mano.
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <div className="p-8">Not found</div>;

  return (
    <>
      <Header title={project.title} />

      <main className="grid grid-cols-12 gap-8 text-black">
        <section className="col-span-12 lg:col-span-8 order-2 lg:order-1 h-screen overflow-y-auto pr-2 space-y-6 custom-scrollbar">
          <ProjectGallery project={project} />
        </section>

        <aside className="col-span-12 lg:col-span-4 order-1 lg:order-2 bg-white lg:sticky lg:top-24 lg:self-start">
          <ProjectMetaInfo project={project} />
          <ProjectDescription project={project} />
          <ProjectContentBlocks project={project} />

          {project.logo && (
            <Image
              src={project.logo}
              alt={`${project.title} logo`}
              width={128}
              height={128}
              className="w-32 h-32 object-contain mt-4"
            />
          )}
        </aside>
      </main>
    </>
  );
}