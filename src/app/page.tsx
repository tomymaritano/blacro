import Navbar from './components/Layout/Navbar';
import GridWrapper from './components/Layout/GridWrapper';
import HeroSection from './components/Hero/HeroSection';
import Footer from './components/Layout/Footer';

export default function Home() {
  return (
    <>
      {/* Navbar global */}
      <Navbar />

      {/* Contenido envuelto en grid */}
      <GridWrapper className="py-8">
        {/* Cada sección es un col-span */}
        <main className="col-span-12 flex flex-col gap-8">
          <HeroSection />

          {/* Acá podrías poner ProjectGrid, CallToAction, etc. */}
        </main>
      </GridWrapper>

      {/* Footer global */}
      <Footer />
</>
  );
}