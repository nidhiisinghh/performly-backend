import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "./CountUp";
import Home from "../home/home";
// Make sure Home is correctly imported. If Background is in components/animate/, 
// and Home is in components/home/, then ../home/home is correct.

const Background = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full min-h-screen">
      {/* 
        Home Component: Rendered in normal flow.
      */}
      <div className="w-full">
        <Home />
      </div>

      {/* 
        Loader Overlay:
        - Fixed positioning to cover the viewport
        - Slides up (y: -100%) when loading is done
      */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 w-full h-full bg-white z-50 flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="text-3xl font-bold font-mono tracking-tighter text-black flex items-start">
              {/* 
                 CountUp component
               */}
              <CountUp
                to={100}
                from={0}
                duration={2} // Adjust speed
                onEnd={() => {
                  // Wait a bit before lifting the curtain?
                  setTimeout(() => setIsLoading(false), 500);
                }}
                className="block"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Background;
