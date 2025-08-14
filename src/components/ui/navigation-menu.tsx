"use client";

import { Github, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function NavigationMenu() {
  return (
    <nav className="fixed w-full top-0 left-0 right-0 z-50 transition-all duration-100 h-15 border-b border-b-white bg-zinc-900">
      <div className="flex md:justify-between items-center px-10 h-full">
        <div className="flex items-center font-semibold text-white space-x-2">
          <Image src="/logo.svg" width={16} height={16} alt="" />
          <h1 className="w-full">Felipe Messias </h1>
        </div>
        <ul className="flex items-center gap-10 text-white">
          <Link href="#about_me">About</Link>
          <Link href="#skills">Skills</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#contact">Contact</Link>
          <div className="flex gap-2">
            <Link
              href="http://github.com/felipeFMS08/"
              className="bg-zinc-800 p-2 rounded"
            >
              <Github />
            </Link>
            <Link
              href="https://www.linkedin.com/in/felipe-messias-fms/"
              className="bg-zinc-800 p-2 rounded"
            >
              <LinkedinIcon />
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
}
