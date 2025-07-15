import { Metadata } from "next";
import { projects } from '@/data/projects';
import Header from '@/components/layout/Header';
import CustomProjectGrid from '@/components/project/CustomProjectGrid';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore our portfolio of creative projects. Brand identity, art direction, events, and digital experiences.",
  openGraph: {
    title: "Projects - Blacro Studio",
    description: "Explore our portfolio of creative projects. Brand identity, art direction, events, and digital experiences.",
    images: [{
      url: "https://res.cloudinary.com/dm9driroe/image/upload/v1/og-portfolio",
      width: 1200,
      height: 630,
      alt: "Blacro Studio Projects",
    }],
  },
};

// Revalidate every 12 hours for portfolio updates
export const revalidate = 43200; // 12 hours in seconds

// Loading component for portfolio grid
function PortfolioGridSkeleton() {
  return (
    <div className="w-full max-w-screen-full mx-auto space-y-12">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 2 }).map((_, cardIndex) => (
              <div key={cardIndex} className="w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-200 animate-pulse rounded-sm" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Portfolio() {
    return (
        <>
            <Header title='Our projects' />
            <Suspense fallback={<PortfolioGridSkeleton />}>
                <CustomProjectGrid projects={projects} />
            </Suspense>
        </>
    );
}