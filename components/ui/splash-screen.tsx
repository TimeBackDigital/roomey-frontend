"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import RoomeyText from "./roomey";

const splashVariants = {
  visible: { opacity: 1 },
  fade: { opacity: 0, transition: { duration: 1 } },
};

const SplashScreen = () => {
  const controls = useAnimationControls();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, transition: { duration: 0.5 } });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await controls.start({
        opacity: 1,
        backgroundColor: "#FFFFFF",
        transition: { duration: 0.5 },
      });
      await new Promise((resolve) => setTimeout(resolve, 500));

      await controls.start("fade");

      setShowSplash(false);
    };

    sequence();
  }, [controls]);

  return showSplash ? (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex justify-center items-center z-10 bg-background"
        variants={splashVariants}
        initial="visible"
        animate={controls}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RoomeyText />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  ) : null;
};

export default SplashScreen;
