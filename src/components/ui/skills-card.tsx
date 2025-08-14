import type { ReactNode } from "react";

interface SkillProps {
  tech: string;
  icon: ReactNode;
}

export function SkillCard( {tech, icon}: SkillProps){
  return (
    <div className=" border border-zinc-700 bg-zinc-800 rounded-md p-3 flex items-center gap-2 font-semibold">
      {icon}
      <h3>{tech}</h3>
    </div>
  )
}