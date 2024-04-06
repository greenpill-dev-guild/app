"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "../Button";

interface SplashProps {
  login: () => void;
  isLoggingIn: boolean;
  buttonLabel: string;
}

export const Splash: React.FC<SplashProps> = ({
  login,
  isLoggingIn,
  buttonLabel,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.4, delay: 1 },
      }}
      className="flex flex-col items-center justify-center text-black"
      // className="absolute top-0 z-50 flex items-center justify-center w-screen h-screen overflow-hidden bg-white"
    >
      <Image
        src="/icons/android-chrome-512x512.png"
        alt="Impact Vocie"
        width={200}
        height={200}
        priority
      />
      <h1 className="xl:text-9xl 2xl:text-[160px] lg:text-8xl md:text-7xl text-[50px] font-semibold text-center">
        Impact
        <br />
        Voice
      </h1>
      <Button
        label={buttonLabel}
        onClick={login}
        disabled={isLoggingIn}
        fullWidth
      />
    </motion.div>
  );
};
