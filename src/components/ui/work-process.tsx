import { motion } from "motion/react"
import { IconShowcase } from "./icon-showcase"

import { LucideIcon } from "lucide-react";

interface WorkProccessProps {
  workProccessData: {
    step: string;
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
}

export function WorkProccess( { workProccessData}: WorkProccessProps) {
  return (
     <div className="max-w-6xl mx-auto md:mx-0 px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Work Proccess
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Proven methodology to deliver exceptional results
            </p>
            <div className="w-20 h-1 bg-red-500 mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {workProccessData.map((process, index) => (
              <IconShowcase
                key={process?.step}
                icon={(process.icon)}
                title={process.title}
                description={process.description}
                delay={index * 0.1}
                step={process.step}
              />
            ))}
          </div>
        </div>
  )

}