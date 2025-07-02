import Header from '@/components/layout/Header';
import { projects } from '../../../../data/projects';
import ProjectGallery from '@/components/project/gallery/ProjectGallery';
import ProjectMetaInfo from '@/components/project/meta/ProjectMetaInfo';
import ProjectDescription from '@/components/project/meta/ProjectDescription';
import ProjectContentBlocks from '@/components/project/gallery/ProjectContentBlocks';
import Image from 'next/image';

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <div className="p-8">Not found</div>;

  return (
    <>
      <Header title={project.title} />

      {/* Grid con altura full solo en desktop */}
      <main className="grid grid-cols-12 gap-3 text-black">
        {/* Galería scrolleable */}
        <section className="col-span-12 lg:col-span-8 order-2 lg:order-1 h-screen overflow-y-auto pr-2 space-y-6 custom-scrollbar">
          <ProjectGallery project={project} />
        </section>

        {/* Sidebar sticky */}
        <aside className="col-span-12 lg:col-span-4 order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">

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