import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import { projects } from '@/data/projects';
import ProjectGallery from '@/components/project/gallery/ProjectGallery';
import ProjectMetaInfo from '@/components/project/meta/ProjectMetaInfo';
import ProjectDescription from '@/components/project/meta/ProjectDescription';
import ProjectContentBlocks from '@/components/project/gallery/ProjectContentBlocks';
import CloudinaryImage from '@/components/common/CloudinaryImage';

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: `${project.category} for ${project.client}. ${project.services?.join(', ')}.`,
    openGraph: {
      title: `${project.title} - Blacro Studio`,
      description: `${project.category} for ${project.client}. ${project.services?.join(', ')}.`,
      images: [{
        url: `https://res.cloudinary.com/dm9driroe/image/upload/c_fill,w_1200,h_630,q_auto,f_auto/${project.mainImageSrc || project.imageSrc}`,
        width: 1200,
        height: 630,
        alt: project.title,
      }],
    },
  };
}

// Revalidate every hour to pick up any data changes
export const revalidate = 3600; // 1 hour in seconds

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
            <CloudinaryImage
              src={project.logo}
              alt={`${project.title} logo`}
              width={128}
              height={128}
              crop="limit"
              className="w-32 h-32 object-contain mt-4"
            />
          )}
        </aside>
      </main>
    </>
  );
}