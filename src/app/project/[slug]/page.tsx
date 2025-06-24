// app/project/[slug]/page.tsx
import Header from '../../components/Layout/Header';
import { projects } from '../../../../data/projects';
import ProjectGallery from '../ProjectGallery';
import ProjectMetaInfo from '../ProjectMetaInfo';
import ProjectDescription from '../ProjectDescription';
import ProjectContentBlocks from '../ProjectContentBlocks';
import Image from 'next/image';

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// ✅ Marcamos el componente como async y await params
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <div className="p-8">Not found</div>;

  return (
    <>
      <Header title={project.title} />

      <main className="grid grid-cols-12 gap-8 text-black">
        <section className="col-span-12 lg:col-span-8 order-2 lg:order-1">
          <ProjectGallery project={project} />
        </section>

        <aside className="col-span-12 lg:col-span-4 flex flex-col space-y-6 sticky top-24 self-start order-1 lg:order-2 z-[-1]">
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