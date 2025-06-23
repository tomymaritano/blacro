import Navbar from './components/Navbar';
import GridWrapper from './components/GridWrapper';

export default function Home() {
  return (
    <>
      {/* Nav global */}
      <Navbar />

      {/* Main content dentro del grid */}
      <GridWrapper className="py-8">
        {/* Usá col-span para controlar ancho */}
        <main className="col-span-12 flex flex-col gap-8 items-center sm:items-start">


          <div className="flex gap-4 items-center flex-col sm:flex-row">
            {/* Links que ya tenías */}
          </div>
        </main>

        <footer className="col-span-12 flex gap-6 flex-wrap items-center justify-center mt-12">
          {/* Footer links */}
        </footer>
      </GridWrapper>
    </>
  );
}