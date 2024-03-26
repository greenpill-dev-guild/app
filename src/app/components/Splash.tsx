"use client";

import React from "react";
import { motion } from "framer-motion";
import SplashText from "./SplashText";

function Splash() {
  return (
    <motion.div
      animate={{
        height: 0,
        transition: { duration: 0.6, delay: 1.5 },
      }}
      className="absolute top-0 z-50 flex items-center justify-center w-screen h-screen overflow-hidden bg-white"
    >
      <SplashText />
    </motion.div>
  );
}

export default Splash;