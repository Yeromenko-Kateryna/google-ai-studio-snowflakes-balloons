/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BalloonItem } from "../types";

const BALOON_PALETTES = [
  { main: "#D4AF37", light: "#FFF1AF", name: "Royal Gold" },      // Gold
  { main: "#2C3E50", light: "#5D6D7E", name: "Premium Slate" },   // Obsidian Slate
  { main: "#1A5276", light: "#5499C7", name: "Deep Sapphire" },   // Midnight Blue
  { main: "#78281F", light: "#C0392B", name: "Executive Crimson" },// Maroon
  { main: "#196F3D", light: "#52BE80", name: "Rich Emerald" },    // Imperial Green
  { main: "#6C3483", light: "#A569BD", name: "Classic Amethyst" },// Royal Purple
  { main: "#B03A2E", light: "#EC7063", name: "Rose Quartz" },    // Soft red-rose
];

export default function BalloonEffect() {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);

  useEffect(() => {
    // Generate an array of 35 beautiful festive balloons of medium size
    const generated: BalloonItem[] = Array.from({ length: 35 }).map((_, i) => {
      const size = Math.floor(Math.random() * 12) + 40; // Medium size: 40px to 52px wide
      const aspectRatio = 1.3; // Height is 1.3x width
      const x = Math.random() * 90 + 5; // Horizontal positions (5% to 95%)
      const duration = Math.random() * 1.5 + 2.4; // Drift duration: 2.4s to 3.9s
      const delay = Math.random() * 1.8; // Random stagger delay
      const sway = Math.random() * 30 + 15; // Width of the lateral sway
      
      const palette = BALOON_PALETTES[i % BALOON_PALETTES.length];

      return {
        id: `balloon-${i}-${Math.random().toString(36).substr(2, 4)}`,
        x,
        size,
        aspectRatio,
        duration,
        delay,
        sway,
        color: palette.main,
        accentColor: palette.light,
      };
    });

    setBalloons(generated);
  }, []);

  return (
    <div 
      id="balloon-overlay-container" 
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    >
      {balloons.map((balloon) => (
        <motion.div
          id={balloon.id}
          key={balloon.id}
          initial={{ 
            y: "115vh", 
            x: `${balloon.x}vw`,
            opacity: 0,
            rotate: 0 
          }}
          animate={{
            y: "-25vh",
            x: [
              `${balloon.x}vw`,
              `${balloon.x + (balloon.sway / 10)}vw`,
              `${balloon.x - (balloon.sway / 10)}vw`,
              `${balloon.x + (balloon.sway / 15)}vw`,
              `${balloon.x}vw`
            ],
            opacity: [0, 0.95, 0.95, 0.9, 0],
            rotate: [-8, 8, -6, 6, 0]
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            ease: "easeOut",
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            width: balloon.size,
          }}
          className="relative flex flex-col items-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
        >
          {/* Balloon main body */}
          <div
            style={{
              width: balloon.size,
              height: balloon.size * balloon.aspectRatio,
              background: `radial-gradient(circle at 35% 30%, ${balloon.accentColor} 0%, ${balloon.color} 80%)`,
            }}
            className="relative rounded-t-full rounded-b-[45%_55%]"
          >
            {/* Glossy Reflection Spot */}
            <div className="absolute top-[12%] left-[16%] w-[25%] h-[22%] rounded-full bg-white/40 blur-[0.6px]" />
          </div>

          {/* Balloon base Knot (Triangle) */}
          <div
            style={{ borderBottomColor: balloon.color }}
            className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] mt-[-1px] z-10"
          />

          {/* Hanging Balloon String */}
          <div className="w-[1.2px] h-12 bg-neutral-400/50 mt-[0.5px] origin-top animate-pulse" />
        </motion.div>
      ))}
    </div>
  );
}
