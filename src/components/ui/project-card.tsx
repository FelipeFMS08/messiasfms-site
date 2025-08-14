import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface SkillCardProps {
  name: string;
  image: string;
  techs: string[];
  description: string;
  liveMode: string | undefined;
  github: string | undefined;
}

export function ProjectCard({
  name,
  image,
  techs,
  description,
  liveMode,
  github,
}: SkillCardProps) {
  return (
    <Card className="pt-0 bg-zinc-900 border border-zinc-700">
      <CardHeader className="p-0">
        <Image src="https://github.com/FelipeFMS08/catalogo-produtos/blob/main/screenshots/image.png?raw=true" height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full rounded-t-xl" alt=""/>
      </CardHeader>
      <CardContent>
                <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
