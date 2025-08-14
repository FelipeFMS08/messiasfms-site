import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SkillProps {
  tech: string;
  icon: ReactNode;
}

export function SkillCard({ tech, icon }: SkillProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 2 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="transition-colors duration-300 border border-zinc-700 bg-zinc-800 rounded-md p-3 flex items-center gap-2 font-semibold hover:border-red-500 hover:text-red-500"
    >
      {icon}
      <h3>{tech}</h3>
    </motion.div>
  );
}
