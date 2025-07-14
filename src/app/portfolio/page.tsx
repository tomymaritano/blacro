// app/portfolio/page.tsx
import { projects } from '../../../data/projects';
import Header from '@/components/layout/Header';
import MasonryGrid from '@/components/layout/MasonryGrid';

export default function Portfolio() {
    return (
        <>
            <Header title='Our portfolio' />
            <MasonryGrid projects={projects} />
        </>
    );
}