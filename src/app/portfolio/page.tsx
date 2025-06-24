// app/portfolio/page.tsx
import { fullProjects } from '../../../data/projects';
import HeroSection from '../components/Hero/HeroSection';
import MasonryGrid from '../components/Layout/MansonryGrid';
// Importá cualquier otra sección que sea parte del portfolio

export default function Portfolio() {
    return (
        <>
            <HeroSection
                // subtitle="(Based in Buenos Aires, Working Worldwide)"
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