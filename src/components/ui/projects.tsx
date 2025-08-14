import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";


export function Projects(){
  return (
    <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Projects
            </h2>
            <p className="text-white max-w-2xl mb-10">
              Some of my main projects.
            </p>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
            <ProjectCard 
              description="SpreesOilRig is a feature-rich, Rust-inspired gameplay plugin designed to drive server engagement through a dynamic, server-wide risk-vs-reward economy. It introduces two core, interconnected world events: the time-scheduled Oil Rig and the player-activated Excavator." 
              github="" 
              image="/projects/rust_minecraft/image_1.png" 
              liveMode="" 
              name="A Oil Platform Rust plugin for Minecraft" 
              techs={["Java", "Paper 1.21", "MySQL", "Yaml", "Maven"]}
              type="Minecraft Plugin"/>
            <ProjectCard 
              description="A fleet management system with geofencing technology for real-time vehicle monitoring on their routes. In addition to vehicle, user, and route management, it features latitude and longitude retrieval technology from a Google Maps route." 
              github="https://github.com/FelipeFMS08/TG-FleetAlert-Web" 
              image="/projects/fleet_alert/image_1.png" 
              liveMode="" 
              name="Fleet Management System" 
              techs={["Typescript", "Prisma", "NextJS", "Shadcn", "Tailwind", "JWT", "RFID", "Bcrypt", "Ray-Casting", "Geofencing", "React Nactive", "Express",]}
              type="Software Web & Mobile App"
              />
            </div>
          </motion.div>
  )
}