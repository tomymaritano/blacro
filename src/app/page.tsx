// app/page.tsx
import HeroSection from '@/components/hero/HeroSection';
import WhatWeDoSection from '@/components/sections/WhatWeDo';
import MainImageGrid from '@/components/main/MainImageGrid';

import { projects } from '@/data/projects';
import { getMainProjects } from '@/lib/utils/projectUtils';

// Revalidate every 24 hours for any content updates
export const revalidate = 86400; // 24 hours in seconds

export default function Home() {
  const mainProjects = getMainProjects(projects);
  
  // Debug logging (remove in production)
  console.log('Server All projects:', projects);
  console.log('Server Main projects:', mainProjects);
  
  return (
    <>
      <HeroSection marginTopClass="mt-30 sm:mt-40 md:mt-60 lg:mt-80"/>
      <MainImageGrid projects={mainProjects} />
      <WhatWeDoSection />
    </>
  );
}