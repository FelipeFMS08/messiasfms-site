import { motion } from "framer-motion";
import { DivideIcon as LucideIcon } from "lucide-react";

interface IconShowcaseProps {
  icon: typeof LucideIcon;
  title: string;
  description: string;
  color?: string;
  delay?: number;
  step: string;
}

export function IconShowcase({ 
  icon: Icon, 
  title, 
  description, 
  color = "text-white",
  delay = 0 ,
  step
}: IconShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`w-16 h-16 mx-auto mb-4 rounded-2xl border border-zinc-700 bg-zinc-800 flex items-center justify-center group-hover:border-red-500 transition-colors duration-300`}
      >
        <div className="relative">
                    <div className="text-red-500"><Icon size={32} className={color} /></div>
                    <div className="absolute -top-5 -right-5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {step}
                    </div>
                  </div>
      </motion.div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}