// app/portfolio/page.tsx
import { projects } from '@/data/projects';
import HeroSection from '../components/Hero/HeroSection';
import Header from '../components/Layout/Header';
import MasonryGrid from '../components/Layout/MansonryGrid';

export default function Portfolio() {
    return (
        <>
            <Header title='Our portfolio' />
            <HeroSection />
            <MasonryGrid projects={projects} />
        </>
    );
}