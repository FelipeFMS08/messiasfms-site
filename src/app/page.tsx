"use client";

import { About } from "@/components/ui/about";
import { Hero } from "@/components/ui/hero";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Skills } from "@/components/ui/skills";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Calendar,
  Code,
  Github,
  Linkedin,
  LinkedinIcon,
  Mail,
  MapPin,
  Target,
  Twitter,
  Users,
  Zap,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { useState } from "react";
import { t } from "@/languages/languages";
import Link from "next/link";
import { WorkProccess } from "@/components/ui/work-process";

export default function Home() {
  const [lang, setLang] = useState<"pt" | "en">("pt");

  const workProcess = [
    {
      step: "01",
      title: "Discovery",
      description:
        "I understand your needs, goals, and target audience to create the perfect strategy.",
      icon: Target,
    },
    {
      step: "02",
      title: "Planning",
      description:
        "I define the architecture, technologies, and detailed project schedule.",
      icon: Calendar,
    },
    {
      step: "03",
      title: "Development",
      description:
        "I code using best practices, testing, and constant updates.",
      icon: Code,
    },
    {
      step: "04",
      title: "Delivery",
      description:
        "Deployment, training, and ongoing support to ensure project success.",
      icon: Zap,
    },
  ];

  return (
    <div className="bg-zinc-900 font-sans min-h-screen">
      <NavigationMenu />
      <main className="w-full min-h-screen flex items-center px-5 md:px-40">
        <Hero />
      </main>
      <section id="about_me" className="w-full px-5 md:px-40">
        <About />
      </section>
      <section id="skills" className="w-full px-5 md:px-40 mt-10">
        <Skills />
      </section>

      {/* <section id="projects" className="w-full px-5 md:px-40 mt-10">
        <PortfolioSection lang={lang}/>
      </section> */}

      <section id="process" className="w-full px-5 md:px-40 mt-10">
        <WorkProccess workProccessData={workProcess} />
      </section>

      <section id="contact" className="w-full px-5 md:px-40 mt-10 hidden">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t[lang].contactTitle}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t[lang].contactDesc}
            </p>
            <div className="w-20 h-1 bg-red-500 mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="glass rounded-2xl p-8 md:p-12">
            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  {t[lang].email}
                </h3>
                <p className="text-sm text-gray-400">
                  felipe.messias.fms@gmail.com
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  {t[lang].location}
                </h3>
                <p className="text-sm text-gray-400">São Paulo, Brasil</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  {t[lang].availability}
                </h3>
                <p className="text-sm text-gray-400">{t[lang].availableNow}</p>
              </motion.div>
            </div>

            {/* Contact Form */}
            <ContactForm lang={lang} />
          </div>
        </div>
      </section>

      <footer className="px-8 py-12 border-t border-zinc-800 mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Felipe Messias<span className="text-red-500">.</span>
              </h3>
              <p className="text-gray-400">Turning ideas into digital solutions</p>
            </div>

            <div className="flex gap-4 text-white">
              <Link href="/" className="bg-zinc-800 p-2 rounded">
                <Github />
              </Link>
              <Link href="/" className="bg-zinc-800 p-2 rounded">
                <LinkedinIcon />
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Felipe Messias. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
