import Image from "next/image";
import Link from "next/link";

export default function HeroTripCard() {
  return (
    <div className="relative h-60 overflow-hidden rounded-3xl">
      <Image
        src="/bus.png"
        alt="Mountain travel destination"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 448px"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-5 left-5 right-5 text-white">
        <p className="text-sm font-semibold">Шинэ аялал эхлүүлэх</p>

        <Link
          href="/chat"
          className="mt-3 inline-flex h-12 items-center justify-center rounded-full bg-[#0e6db1] px-8 font-bold shadow-lg transition hover:scale-[1.02]"
        >
          ▶ Эхлэх
        </Link>
      </div>
    </div>
  );
}