import { motion } from "framer-motion";
import { ExternalLink, Github, Code, Smartphone, Globe } from "lucide-react";
import { ModernCard, ModernCardContent, ModernCardFooter, ModernCardHeader } from "@/components/ui/modern-card";
import { ModernButton } from "@/components/ui/modern-button";
import { t } from "@/languages/languages";

interface PortfolioSectionProps {
  lang: "pt" | "en";
}

export function PortfolioSection({ lang }: PortfolioSectionProps) {
  const projects = [
    {
      title: "E-commerce Platform",
      description: t[lang].ecommerceDesc,
      tech: ["Next.js", "TypeScript", "Stripe", "Prisma"],
      icon: <Globe size={48} />,
      category: t[lang].webApp,
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Task Management App",
      description: t[lang].taskAppDesc,
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      icon: <Code size={48} />,
      category: t[lang].webApp,
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Mobile Banking App",
      description: t[lang].bankingAppDesc,
      tech: ["React Native", "Node.js", "PostgreSQL"],
      icon: <Smartphone size={48} />,
      category: t[lang].mobileApp,
      color: "from-purple-500/20 to-violet-500/20"
    },
    {
      title: "Real Estate Platform",
      description: t[lang].realEstateDesc,
      tech: ["Vue.js", "Laravel", "MySQL"],
      icon: <Globe size={48} />,
      category: t[lang].webApp,
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Restaurant System",
      description: t[lang].restaurantDesc,
      tech: ["React", "Express", "MongoDB"],
      icon: <Code size={48} />,
      category: t[lang].webApp,
      color: "from-pink-500/20 to-rose-500/20"
    },
    {
      title: "Fitness Tracker",
      description: t[lang].fitnessDesc,
      tech: ["React Native", "Firebase", "Node.js"],
      icon: <Smartphone size={48} />,
      category: t[lang].mobileApp,
      color: "from-indigo-500/20 to-blue-500/20"
    }
  ];

  return (
    <section id="portfolio" className="section-padding bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t[lang].portfolio}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {lang === 'pt' 
              ? 'Projetos que demonstram minha experiência e habilidades técnicas'
              : 'Projects that demonstrate my experience and technical skills'
            }
          </p>
          <div className="w-20 h-1 bg-red-500 mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ModernCard className={`h-full bg-gradient-to-br ${project.color} border-gray-800`} glow>
                <ModernCardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-red-400">
                      {project.icon}
                    </div>
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                </ModernCardHeader>
                
                <ModernCardContent>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-md border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </ModernCardContent>

                <ModernCardFooter>
                  <div className="flex gap-2">
                    <ModernButton variant="outline" size="sm" className="flex-1">
                      <Github size={16} className="mr-2" />
                      Code
                    </ModernButton>
                    <ModernButton size="sm" className="flex-1">
                      <ExternalLink size={16} className="mr-2" />
                      Demo
                    </ModernButton>
                  </div>
                </ModernCardFooter>
              </ModernCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <ModernButton 
            variant="outline" 
            size="lg"
            onClick={() => window.open('https://github.com/FelipeFMS08', '_blank')}
          >
            <Github size={20} className="mr-2" />
            {lang === 'pt' ? 'Ver Mais no GitHub' : 'View More on GitHub'}
          </ModernButton>
        </motion.div>
      </div>
    </section>
  );
}