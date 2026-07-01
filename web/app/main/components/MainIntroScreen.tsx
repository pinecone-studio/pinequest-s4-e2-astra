"use client";

import Image from "next/image";
import Logo from "@/components/home/Logo";
import type { MainScreen } from "./mainTypes";

type MainIntroScreenProps = {
  screen: MainScreen;
  onStart: () => void;
};

export default function MainIntroScreen({ screen, onStart }: MainIntroScreenProps) {

  
  return (
    <section className="relative flex h-full w-full items-end justify-center overflow-hidden">

      <div className="absolute inset-0 mongolia-bg-motion">
        <Image
          src="/main.png"
          alt="Mongolia nature"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="relative flex w-full max-w-sm flex-col items-center gap-8 px-6 pb-16 text-center text-white">
        
        <Logo large />
        <div className="space-y-4">
        </div>


        <button
          onClick={onStart}
          className="h-14 w-full max-w-[220px] rounded-full bg-[#0A4429] text-white font-bold shadow-2xl transition-all duration-200 active:scale-95"
        >
          Эхлэх
        </button>
      </div>
    </section>
  );
}