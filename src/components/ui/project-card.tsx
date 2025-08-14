import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";
import Image from "next/image";
import { Badge } from "./badge";
import Link from "next/link";
import { Github } from "lucide-react";

interface SkillCardProps {
  name: string;
  image: string;
  techs: string[];
  description: string;
  liveMode: string | undefined;
  github: string | undefined;
  type: string;
}

export function ProjectCard({
  name,
  image,
  techs,
  description,
  liveMode,
  github,
  type
}: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <Card className="pt-0 border border-zinc-700 bg-zinc-800 h-[630px]" >
        <CardHeader className="p-0 relative">
          <Image
            src={image}
            height={0}
            width={0}
            sizes="100vw"
            className="max-h-[200px] w-full rounded-t-xl"
            alt=""
          />
          <Badge className="absolute text-white font-semibold right-2 top-2">{type}</Badge>
        </CardHeader>
        <CardContent className="flex flex-col px-4 gap-2">
          <h3 className="font-bold text-lg text-white text-start">{name}</h3>
          <div className="flex flex-wrap w-full gap-2">
            {techs.map((tech) => (
              <Badge
                key={tech}
                className="text-white bg-zinc-800 border-zinc-700 px-3 py-1 hover:border-red-500 hover:text-red-500 transition-colors duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
          <p className="text-white text-start mt-2 text-sm">{description}</p>
        </CardContent>
        <CardFooter className="flex items-end justify-end">
          { github ? <Link href={github!} className="bg-zinc-900 text-white hover:bg-zinc-800 hover:border hover:border-zinc-600 font-semibold w-36 py-3 rounded-lg flex gap-1 px-3  justify-center"><Github /> Github</Link> : (<></>)}
          { liveMode ?? <Link href="livemode"></Link>}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
