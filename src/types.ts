/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SnowflakeItem {
  id: string;
  x: number; // Percentage from left (0 to 100)
  size: number; // Size in pixels (medium, e.g., 20 to 30)
  duration: number; // Falling time in seconds
  delay: number; // Staggered delay in seconds
  sway: number; // Horizontal drift amplitude
  opacity: number;
}

export interface BalloonItem {
  id: string;
  x: number; // Percentage from left (0 to 100)
  size: number; // Width of balloon in pixels (medium, e.g., 40 to 52)
  aspectRatio: number; // Height to width ratio
  duration: number; // Floating time in seconds
  delay: number; // Staggered delay in seconds
  sway: number; // Double sway movement
  color: string; // Tailwind CSS or hexadecimal formal color
  accentColor: string; // Highlights/shading color
}
