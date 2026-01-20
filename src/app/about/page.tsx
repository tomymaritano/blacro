"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import LogosMarquee from "@/components/ui/navigation/LogosMarquee";
import GridWrapper from "@/components/layout/GridWrapper";
import { aboutParagraphs, servicesData } from '@/data/aboutParagraphs';
import { ANIMATIONS } from "@/constants/design-tokens";
import { aboutStructuredData } from "./structured-data";

// Animation variants for consistent motion
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: ANIMATIONS.DURATION.SLOW,
            ease: ANIMATIONS.EASING.EASE_OUT
        }
    }
};

export default function AboutPage(): React.JSX.Element {
    return (
        <GridWrapper className="py-8">
            <main className="col-span-12 flex flex-col gap-3">
                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(aboutStructuredData),
                    }}
                />

                <Header title="ABOUT US" />

                {/* Hero Section - Company founders and story */}
                <section
                    className="grid grid-cols-12 gap-3 lg:gap-x-16 items-start w-full"
                    aria-labelledby="about-section"
                >
                    {/* Hero Image */}
                    <motion.figure
                        className="col-span-12 lg:col-span-4 w-full flex justify-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                    >
                        <Image
                            src="/ABOUT US/Rectangle 30.jpg"
                            alt="Blacro Studio founders - Creative team behind the innovative design studio"
                            width={500}
                            height={750}
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover object-center w-full h-auto"
                            priority
                        />
                    </motion.figure>

                    {/* Company Story Content */}
                    <motion.article
                        className="col-span-12 lg:col-span-6 flex flex-col space-y-6 text-black/80 lg:pl-16 pr-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: ANIMATIONS.DURATION.FAST
                                }
                            }
                        }}
                    >
                        <h2 className="sr-only">About Blacro Studio</h2>
                        {aboutParagraphs.map((paragraph, i) => (
                            <motion.p
                                key={i}
                                className="text-sm lg:text-base leading-relaxed tracking-wide font-familjen"
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: ANIMATIONS.DURATION.SLOW,
                                            ease: ANIMATIONS.EASING.EASE_OUT
                                        }
                                    }
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </motion.article>
                </section>

                {/* Services Grid Section */}
                <motion.section
                    className="mt-16 w-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    aria-label="Our services"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 py-8 border-t border-black/10">
                        {/* ESPACIOS */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-sm font-semibold text-black tracking-wide font-familjen">
                                {servicesData.espacios.title}
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {servicesData.espacios.services.map((service, i) => (
                                    <li
                                        key={i}
                                        className="text-sm text-black/60 tracking-wide font-familjen"
                                    >
                                        {service}{i === 0 && " >"}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* EXPERIENCIAS */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-sm font-semibold text-black tracking-wide font-familjen">
                                {servicesData.experiencias.title}
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {servicesData.experiencias.services.map((service, i) => (
                                    <li
                                        key={i}
                                        className="text-sm text-black/60 tracking-wide font-familjen"
                                    >
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* BRANDING */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-sm font-semibold text-black tracking-wide font-familjen">
                                {servicesData.branding.title}
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {servicesData.branding.services.map((service, i) => (
                                    <li
                                        key={i}
                                        className="text-sm text-black/60 tracking-wide font-familjen"
                                    >
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* Client Logos Section */}
                <motion.section
                    className="mt-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    aria-label="Client partners and collaborations"
                >
                    <LogosMarquee />
                </motion.section>

            </main>
        </GridWrapper>
    );
}
