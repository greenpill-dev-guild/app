"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function SplashText() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: 0,
        transition: { duration: 0.4, delay: 1 },
      }}
      className="flex flex-col items-center justify-center text-black"
    >
      <Image
        src="/africa.png"
        alt="Greenpill Africa"
        width={200}
        height={200}
        priority
      />
      <h1 className="xl:text-9xl 2xl:text-[160px] lg:text-8xl md:text-7xl text-[50px] font-semibold text-center">
        GreenPill
        <br />
        Africa
      </h1>
      <p className="absolute bottom-0 pb-4 font-extralight text-xs">
        powered by <b>impact stream</b>
      </p>
    </motion.div>
  );
}

export default SplashText;