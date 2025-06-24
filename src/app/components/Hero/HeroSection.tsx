"use client";

export default function HeroSection() {
    return (
        <section className="w-full py-20 grid grid-cols-12 ">
            {/* Espacio vacío solo en desktop */}
            <div className="hidden lg:block col-span-7"></div>

            {/* Bloque derecho */}
            <div className="col-span-12 lg:col-span-5 flex flex-col items-end lg:items-end text-right md:text-right md:items-right lg:text-right sm:items-right  space-y-4">
                <p className="text-[18px] sm:text-[22px] lg:text-[24px] tracking-wide text-black/60 font-grotesk">
                    (Based in Buenos Aires, Working Worldwide)
                </p>
                <h1 className="text-[28px] sm:text-[28px] lg:text-[40px] leading-snug font-grotesk font-medium text-black max-w-3xl">
                    SOMOS UN ESTUDIO CREATIVO INTEGRAL. CONVERTIMOS IDEAS EN MARCAS, ESPACIOS Y EXPERIENCIAS.
                </h1>
            </div>
        </section>
    );
}