// app/page.tsx
import HeroSection from './components/Hero/HeroSection';
import ProjectGrid from './project/ProjectGrid';
import WhatWeDoSection from './components/WhatWeDo';

import { featuredProjects } from '../../data/projects';

export default function Home() {
  return (
    <>
      <HeroSection
        marginTopClass='mt-20'
        subtitle="(Based in Buenos Aires, Working Worldwide)"
        lines={[
          "SOMOS UN ESTUDIO CREATIVO INTEGRAL.",
          "CONVERTIMOS IDEAS EN MARCAS",
          "ESPACIOS Y EXPERIENCIAS."
        ]}
      />

      <ProjectGrid projects={featuredProjects} />


      <WhatWeDoSection />
    </>
  );
}