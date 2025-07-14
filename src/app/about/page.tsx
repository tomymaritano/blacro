"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import LogosMarquee from "@/components/ui/navigation/LogosMarquee";
import ProjectCarouselRow from "@/components/project/carousel/ProjectCardCarouselRow";
import { aboutParagraphs } from '@/data/aboutParagraphs';
import { ANIMATIONS } from "@/constants/design-tokens";
import { aboutStructuredData } from "./structured-data";

// Animation variants for consistent motion - moved outside component to prevent re-creation
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

/**
 * AboutPage - Company information and team presentation
 * 
 * Features:
 * - Optimized hero image with proper loading
 * - Responsive grid layout
 * - Animated text content with Inter font
 * - Bold text highlighting with markdown-style parsing
 * - Client logos marquee
 * - Related projects carousel
 * 
 * @component
 * @returns {React.JSX.Element} The rendered about page
 */
export default function AboutPage(): React.JSX.Element {

    return (
        <>
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
                        src="/images/about.jpg"
                        alt="Blacro Studio founders - Creative team behind the innovative design studio"
                        width={500}
                        height={750}
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="rounded-xl object-cover object-center w-full h-auto pr-2"
                        priority
                    />
                </motion.figure>

                {/* Company Story Content */}
                <motion.article 
                    className="col-span-12 lg:col-span-6 flex flex-col space-y-8 text-black/80 lg:pl-16 pr-8"
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
                    {aboutParagraphs.map((paragraph, i) => {
                        const parts = paragraph.split(/\*\*(.*?)\*\*/);
                        return (
                            <motion.p
                                key={i}
                                className="text-lg leading-relaxed tracking-wide font-sans"
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
                                {parts.map((part, index) =>
                                    index % 2 === 1 ? (
                                        <strong 
                                            key={index} 
                                            className="font-semibold text-black font-sans"
                                        >
                                            {part}
                                        </strong>
                                    ) : (
                                        part
                                    )
                                )}
                            </motion.p>
                        );
                    })}
                </motion.article>
            </section>

            {/* Client Logos Section */}
            <motion.section 
                className="mt-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                aria-label="Client partners and collaborations"
            >
                <LogosMarquee />
            </motion.section>

            {/* Related Projects Section */}
            <motion.section 
                className="mt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInUp}
                aria-label="Featured projects showcase"
            >
                <ProjectCarouselRow />
            </motion.section>
        </>
    );
}