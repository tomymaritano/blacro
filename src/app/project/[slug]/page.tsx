// app/project/[slug]/page.tsx
import Header from '@/app/components/Layout/Header';
import { projects } from '../../../../data/projects';
import Image from 'next/image';

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return <div className="p-8">Not found</div>;
  }

  return (
    <>
      <Header title={project.slug} />
      <main className="mx-auto grid grid-cols-12 gap-8 text-black">
        {/* === Columna izquierda: Galería === */}
        <section className="col-span-12 lg:col-span-8 flex flex-col space-y-6">
          {/* Imagen principal */}
          <Image
            src={project.imageSrc}
            alt={project.title}
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-xl"
          />

          {/* Galería secundaria si existe */}
          {project.images?.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`${project.title} image ${i + 1}`}
              width={1200}
              height={800}
              className="w-full h-auto object-cover rounded-xl"
            />
          ))}
        </section>

        {/* === Columna derecha: Info del proyecto === */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col space-y-6 sticky top-24 self-start">
          {/* Título y categoría */}
          {project.category && (
            <p className="text-sm uppercase opacity-70">{project.category}</p>
          )}

          {/* Meta info */}
          <div className="space-y-2 text-sm opacity-80">
            {project.location && (
              <p>
                <strong>Location:</strong> {project.location}
              </p>
            )}
            {project.year && (
              <p>
                <strong>Year:</strong> {project.year}
              </p>
            )}
            {project.services && (
              <p>
                <strong>Services:</strong> {project.services.join(', ')}
              </p>
            )}
          </div>

          {/* Descripción */}
          {project.description && (
            <p className="leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          )}

          {/* Podés incluir logo si es relevante */}
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