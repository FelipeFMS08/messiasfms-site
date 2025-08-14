"use client";

import { motion } from "motion/react";

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-white flex flex-col gap-4"
    >
      <h1 className="font-bold text-2xl">About Me</h1>
      <p>
        I am a software developer with a passion for creating innovative and
        efficient solutions. With a strong foundation in computer science and a
        keen eye for detail, I strive to deliver high-quality software that
        meets and exceeds expectations. My expertise lies in full-stack
        development, with a focus on building scalable and maintainable
        applications. I am proficient in various programming languages,
        frameworks, and tools, and I am always eager to learn and adapt to new
        technologies. I am a collaborative team player and enjoy working on
        challenging projects that push my boundaries and allow me to grow as a
        developer.
      </p>
    </motion.div>
  );
}
