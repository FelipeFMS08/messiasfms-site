"use client";

import { FileCode } from "lucide-react";
import { SkillCard } from "./skills-card";
import { TbBrandTypescript } from "react-icons/tb";
import { RiReactjsFill } from "react-icons/ri";


export function Skills() {
  return (
    <div className="text-white flex flex-col">
      <h1 className="font-bold text-white text-2xl mb-5">Skills</h1>
      <div className="w-full grid grid-cols-4 gap-5">
        <SkillCard icon={<TbBrandTypescript size="1.5rem" />} tech="JavaScript" />
        <SkillCard icon={<RiReactjsFill size="1.5rem" />} tech="React" />
        <SkillCard icon={<TbBrandTypescript size="1.5rem" />} tech="JavaScript" />
        <SkillCard icon={<TbBrandTypescript size="1.5rem" />} tech="JavaScript" />
        <SkillCard icon={<TbBrandTypescript size="1.5rem" />} tech="JavaScript" />
        <SkillCard icon={<TbBrandTypescript size="1.5rem" />} tech="JavaScript" />
        <SkillCard icon={<TbBrandTypescript size="1.5rem" />} tech="JavaScript" />
        <SkillCard icon={<TbBrandTypescript size="1.5rem" />} tech="JavaScript" />
      </div>
    </div>
  );
}