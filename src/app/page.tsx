import { About } from "@/components/ui/about";
import { Hero } from "@/components/ui/hero";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Skills } from "@/components/ui/skills";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-900 font-sans min-h-screen">
      <NavigationMenu />
      <main className="w-full min-h-screen flex items-center px-5 md:px-40">
        <Hero />
      </main>
      <section id="about_me" className="w-full px-40">
        <About />
      </section>
      <section id="skills" className="w-full px-40 mt-10">
        <Skills />
      </section>
    </div>
  );
}
