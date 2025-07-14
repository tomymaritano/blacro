// app/page.tsx
import HeroSection from '@/components/hero/HeroSection';
import WhatWeDoSection from '@/components/sections/WhatWeDo';
import MainImageGrid from '@/components/main/MainImageGrid';

import { mainImages } from '@/data/mainImages';

export default function Home() {
  return (
    <>
      <HeroSection marginTopClass="mt-30 sm:mt-40 md:mt-60 lg:mt-80"/>
      <MainImageGrid images={mainImages} />
      <WhatWeDoSection />
    </>
  );
}