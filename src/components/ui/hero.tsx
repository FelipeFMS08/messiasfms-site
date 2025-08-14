import { Button } from "./button";

export function Hero() {
  return (
      <div className="bg-gradient-to-br from-red-400 to-red-900 w-full min-h-full px-5 md:px10 py-20 md:py-0 md:pt-40 md:pb-15 rounded-xl">
        <div className="mt-10 flex flex-col gap-6">
          <h1 className="font-bold text-white text-6xl">Software Developer</h1>
          <p className="text-white text-lg">Full stack developer specialized in creating digital solutions that drive business growth. I transform your ideas into high-performance web and mobile applications.</p>
          <Button className="bg-zinc-900 text-white hover:bg-zinc-800 transition-all duration-300 font-semibold text-lg w-50 py-7 mt-5">View Projects</Button>
        </div>
    </div>
  )
}