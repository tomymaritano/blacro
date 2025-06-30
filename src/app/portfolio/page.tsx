// app/portfolio/page.tsx
import { projects } from '../../../data/projects';
import Header from '../components/Layout/Header';
import MasonryGrid from '../components/Layout/MansonryGrid';

export default function Portfolio() {
    return (
        <>
            <Header title='Our portfolio' />
            <MasonryGrid projects={projects} />
        </>
    );
}