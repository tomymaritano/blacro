// app/portfolio/page.tsx
import { fullProjects } from '../../../data/projects';
import HeroSection from '../components/Hero/HeroSection';
import Header from '../components/Layout/Header';
import MasonryGrid from '../components/Layout/MansonryGrid';

export default function Portfolio() {
    return (
        <>
            <Header title='Our portfolio' />
            <HeroSection
                lines={[
                    "Nos mueve la curiosidad, el deseo de jugar, de experimentar,",
                    "de ir más allá de lo predecible.",
                    "Por eso creamos proyectos que se animan a más."
                ]}
            />


            <MasonryGrid projects={fullProjects} />
        </>
    );
}