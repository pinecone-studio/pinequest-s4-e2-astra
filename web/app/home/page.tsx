"use client";

import type { ReactNode } from "react";
import HomeBackdrop from "@/components/home/HomeBackdrop";
import HomeFooter from "@/components/home/Footer";
import Logo from "@/components/home/Logo";
import PhoneFrame from "@/components/home/PhoneFrame";
import HeroTripCard from "./components/HeroTripCard";
import HeroWeatherPanel from "./components/HeroWeatherPanel";
import { useHeroForecast } from "./components/useHeroForecast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

type HeroPageShellProps = {
  children: ReactNode;
};

type HeroPhoneLayoutProps = {
  children: ReactNode;
};

type HeroScrollAreaProps = {
  children: ReactNode;
};

function HeroPageShell({ children }: HeroPageShellProps) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-8 text-slate-950">
      <HomeBackdrop active={true} />

      <div className="relative z-10">{children}</div>
    </main>
  );
}

function HeroPhoneLayout({ children }: HeroPhoneLayoutProps) {
  return (
    <PhoneFrame>
      <section className="home-enter flex h-full flex-col bg-[#fbfbff]">
        {children}
      </section>
    </PhoneFrame>
  );
}

function HeroHeader() {
  return (
    <header className="flex items-center justify-between bg-[#1b9bd7] border-b border-slate-200 px-5 pb-4 pt-8">
      <Logo />

      <button
        type="button"
        aria-label="Profile"
        className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#62a132]/30 bg-[#62a132]/10 text-lg text-[#d3d3d3] transition-colors hover:bg-[#62a132]/20"
      >
        <FontAwesomeIcon icon={faUser} />
      </button>
    </header>
  );
}

function HeroScrollArea({ children }: HeroScrollAreaProps) {
  return (
    <div className="scrollbar-invisible min-h-0 flex-1 overflow-y-auto">
      <div className="space-y-7 px-5 py-6">{children}</div>
    </div>
  );
}

function HeroFooterBar() {
  return (
    <div className="shrink-0">
      <HomeFooter />
    </div>
  );
}

function HeroContent() {
  const forecast = useHeroForecast();

  return (
    <>
      <HeroHeader />

      <HeroScrollArea>
        <HeroTripCard />

        <HeroWeatherPanel forecast={forecast} />
      </HeroScrollArea>

      <HeroFooterBar />
    </>
  );
}

export default function HeroPage() {
  return (
    <HeroPageShell>
      <HeroPhoneLayout>
        <HeroContent />
      </HeroPhoneLayout>
    </HeroPageShell>
  );
}