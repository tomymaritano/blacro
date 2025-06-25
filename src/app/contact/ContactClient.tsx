"use client";

import Header from "../components/Layout/Header";
import { motion } from "framer-motion";
import ProjectCarouselRow from "../project/ProjectCardCarouselRow";
import ContactForm from "./ContactForm";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function ContactClient() {
  return (
    <>
      <section className="grid grid-cols-12 w-full items-start gap-8 lg:gap-12 mt-8 md:mt-12 lg:mt-20 mb-6 md:mb-30 sm:px-8">
        <motion.div
          className="col-span-12 lg:col-span-6 flex flex-col"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Header title="Let's Talk" className="!mt-0 !mb-0" />
        </motion.div>

        <motion.div
          className="col-span-12 lg:col-span-6 mt-6 lg:mt-0 flex flex-col items-center lg:items-end w-full"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1 }}
        >
          <ContactForm />
        </motion.div>
      </section>
      <ProjectCarouselRow />
    </>
  );
}