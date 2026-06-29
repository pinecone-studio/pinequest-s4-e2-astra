"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const openEase = [0.76, 0, 0.24, 1] as const;

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#f7f4ed]">
      <motion.div
        initial={{ scale: 1.08, x: "-1.5%", y: "-1%" }}
        animate={{
          scale: [1.08, 1.14, 1.1],
          x: ["-1.5%", "1.8%", "-0.6%"],
          y: ["-1%", "0.8%", "-0.4%"],
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0"
      >
        <Image
          src="/khuvsgul-lake.jpg"
          alt="Khuvsgul lake"
          fill
          priority
          className="object-cover"
        />
      </motion.div>


      <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ed]/25 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0.72 }}
        animate={{ opacity: 0.18 }}
        transition={{ duration: 3.2, delay: 1.1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(247,244,237,.18)_36%,rgba(28,42,18,.5)_100%)]"
      />

  
      <motion.img
        src="/cloud-left.png"
        alt="cloud left"
        initial={{ x: 0, opacity: 1, scale: 1.15 }}
        animate={{ x: "-85vw", opacity: 0, scale: 1.35 }}
        transition={{
          duration: 3,
          delay: 0.4,
          ease: openEase,
        }}
        className="pointer-events-none absolute left-[-10%] top-[-15%] z-50 h-[130vh] w-[75vw] object-cover"
      />

  
      <motion.img
        src="/cloud-right.png"
        alt="cloud right"
        initial={{ x: 0, opacity: 1, scale: 1.15 }}
        animate={{ x: "85vw", opacity: 0, scale: 1.35 }}
        transition={{
          duration: 3,
          delay: 0.4,
          ease: openEase,
        }}
        className="pointer-events-none absolute right-[-10%] top-[-15%] z-50 h-[130vh] w-[75vw] object-cover"
      />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, delay: 1.6 }}
        className="pointer-events-none absolute inset-0 z-40 bg-white/30 backdrop-blur-sm"
      />


      <motion.div
        initial={{ opacity: 0, y: 90, scale: 0.74, rotateX: 18, filter: "blur(18px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.25, delay: 2.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center [perspective:1200px] sm:px-16"
      >
     

        <motion.h1
          initial={{ opacity: 0, scale: 0.42, z: -260, filter: "blur(24px)" }}
          animate={{ opacity: 1, scale: 1, z: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.35, delay: 2.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl font-black tracking-normal text-[#314414] drop-shadow-[0_18px_45px_rgba(247,244,237,.75)] sm:text-9xl "
        >
          MonTrip
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.15 }}
          className="mt-6 max-w-xl text-2xl leading-snug text-black sm:text-3xl"
        >
          Монголд аялах хамгийн тохиромжтой газрыг{" "}
          <span className="font-bold text-[#4d641f]">AI</span> санал болгоно
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 3.9 },
            y: { repeat: Infinity, duration: 1.4 },
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-black/60"
        >
          ↓ Scroll to explore
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
