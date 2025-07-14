// app/portfolio/page.tsx
import { projects } from '../../../data/projects';
import Header from '@/components/layout/Header';
import CustomProjectGrid from '@/components/project/CustomProjectGrid';

export default function Portfolio() {
    return (
        <>
            <Header title='Our portfolio' />
            <CustomProjectGrid projects={projects} />
        </>
    );
}