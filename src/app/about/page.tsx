"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../components/Layout/Header";
import LogosMarquee from "../components/ui/LogosMarquee";
import ProjectCarouselRow from "../project/ProjectCardCarouselRow";
import { aboutParagraphs } from '../../../data/aboutParagraphs'

export default function AboutPage() {
    return (
        <>
            <Header title="ABOUT US" />

            {/* La imagen y el texto se alinean en altura automáticamente */}
            <section className="grid grid-cols-12 gap-8 lg:gap-x-16 items-start w-full">
                {/* Imagen */}
                <figure className="col-span-12 lg:col-span-4 w-full flex justify-center">
                    <Image
                        src="/images/about.jpg"
                        alt="Blacro founders"
                        width={500}
                        height={750}
                        className="rounded-xl object-cover object-center w-full h-auto pr-2"
                        priority
                    />
                </figure>

                {/* Texto */}
                <div className="col-span-12 lg:col-span-6 flex flex-col space-y-8 text-black/80 lg:pl-16 pr-8">
                    {aboutParagraphs.map((paragraph, i) => {
                        const parts = paragraph.split(/\*\*(.*?)\*\*/);
                        return (
                            <motion.p
                                key={i}
                                className="text-lg leading-relaxed tracking-wide"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.2 }}
                                viewport={{ once: true }}
                            >
                                {parts.map((part, index) =>
                                    index % 2 === 1 ? (
                                        <strong key={index} className="font-semibold text-black">{part}</strong>
                                    ) : (
                                        part
                                    )
                                )}
                            </motion.p>
                        );
                    })}
                </div>
            </section>

            <LogosMarquee />
            <ProjectCarouselRow />
        </>
    );
}