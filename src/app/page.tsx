// app/page.tsx
import HeroSection from './components/Hero/HeroSection';
import WhatWeDoSection from './components/WhatWeDo';

import { featuredProjects } from '../../data/projects';
import HomeProjectGrid from './project/HomeProjectGrid';

export default function Home() {
  return (
    <>
      <HeroSection marginTopClass="mt-70"/>
      <HomeProjectGrid projects={featuredProjects} />
      <WhatWeDoSection />
    </>
  );
}