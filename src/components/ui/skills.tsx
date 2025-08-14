"use client";

import { FileCode } from "lucide-react";
import { SkillCard } from "./skills-card";
import {
  TbBrandAzure,
  TbBrandCSharp,
  TbBrandMysql,
  TbBrandNextjs,
  TbBrandTypescript,
  TbSql,
} from "react-icons/tb";
import { RiJavascriptLine, RiReactjsFill } from "react-icons/ri";
import { delay, motion } from "motion/react";

export function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      viewport={{ once: true }}
      className="text-white flex flex-col"
    >
      <h1 className="font-bold text-white text-2xl mb-5">Principal Skills</h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-5">
        <SkillCard
          icon={<TbBrandTypescript size="1.5rem" />}
          tech="Typescript"
        />
        <SkillCard icon={<TbBrandCSharp size="1.5rem" />} tech="CSharp" />
        <SkillCard icon={<TbBrandTypescript size="1.5rem" />} tech="Java" />
        <SkillCard
          icon={<RiJavascriptLine size="1.5rem" />}
          tech="JavaScript"
        />
        <SkillCard icon={<TbBrandNextjs size="1.5rem" />} tech="Next.JS" />
        <SkillCard icon={<TbBrandMysql size="1.5rem" />} tech="MySql" />
        <SkillCard icon={<TbSql size="1.5rem" />} tech="Sql Server" />
        <SkillCard icon={<TbBrandAzure size="1.5rem" />} tech="Azure" />
      </div>
    </motion.div>
  );
}
