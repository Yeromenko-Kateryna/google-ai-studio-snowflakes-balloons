/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Snowflake } from "lucide-react";
import { SnowflakeItem } from "../types";

export default function SnowflakeEffect() {
  const [snowflakes, setSnowflakes] = useState<SnowflakeItem[]>([]);

  useEffect(() => {
    // Generate an array of 50 elegant medium snowflakes
    const generated: SnowflakeItem[] = Array.from({ length: 50 }).map((_, i) => {
      const size = Math.floor(Math.random() * 12) + 18; // Medium size: 18px to 30px
      const x = Math.random() * 100; // Position percentage across screen width
      const duration = Math.random() * 1.5 + 2.5; // Custom falling speed: 2.5s to 4.0s
      const delay = Math.random() * 1.8; // Random stagger delay
      const sway = Math.random() * 40 + 20; // Staggered horizontal wave width
      const opacity = Math.random() * 0.4 + 0.5; // Medium snowflake opacities for depth (0.5 to 0.9)

      return {
        id: `snow-${i}-${Math.random().toString(36).substr(2, 4)}`,
        x,
        size,
        duration,
        delay,
        sway,
        opacity,
      };
    });

    setSnowflakes(generated);
  }, []);

  return (
    <div 
      id="snowflake-overlay-container" 
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    >
      {snowflakes.map((flake) => (
        <motion.div
          id={flake.id}
          key={flake.id}
          initial={{ 
            y: "-10vh", 
            x: `${flake.x}vw`, 
            opacity: 0, 
            rotate: 0 
          }}
          animate={{
            y: "110vh",
            x: [
              `${flake.x}vw`,
              `${flake.x + (flake.sway / 10)}vw`,
              `${flake.x - (flake.sway / 10)}vw`,
              `${flake.x + (flake.sway / 15)}vw`,
              `${flake.x}vw`
            ],
            opacity: [0, flake.opacity, flake.opacity, flake.opacity * 0.8, 0],
            rotate: [0, 45, -45, 90, 180],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            width: flake.size,
            height: flake.size,
          }}
          className="flex items-center justify-center text-sky-100/90 drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]"
        >
          <Snowflake size={flake.size} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
}
