// app/page.tsx
import HeroSection from './components/Hero/HeroSection';
import WhatWeDoSection from './components/WhatWeDo';

import { featuredProjects } from '../../data/projects';
import HomeProjectGrid from './project/HomeProjectGrid';

export default function Home() {
  return (
    <>
      <HeroSection marginTopClass="mt-30 sm:mt-40 md:mt-60 lg:mt-80"/>
      <HomeProjectGrid projects={featuredProjects} />
      <WhatWeDoSection />
    </>
  );
}