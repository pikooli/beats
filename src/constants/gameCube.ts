import { Z_BASIC_OFFSET } from './common';

interface GAME_CUBES {
  id: number;
  targetId: number;
  speed: number;
  displayTime: number;
}
interface GAME_TARGETS {
  id: number;
  x: number;
  y: number;
  z: number;
  color: string;
}

export const CUBES_TARGETS: GAME_TARGETS[] = [
  { id: 0, x: -0.75, y: 0.7, z: Z_BASIC_OFFSET, color: '#FF5733' },
  { id: 1, x: -0.75, y: 0, z: Z_BASIC_OFFSET, color: '#33FF57' },
  { id: 2, x: -0.75, y: -0.7, z: Z_BASIC_OFFSET, color: '#3357FF' },
  { id: 3, x: 0.75, y: 0.7, z: Z_BASIC_OFFSET, color: '#FF33A1' },
  { id: 4, x: 0.75, y: 0, z: Z_BASIC_OFFSET, color: '#A133FF' },
  { id: 5, x: 0.75, y: -0.7, z: Z_BASIC_OFFSET, color: '#33FFA1' },
] as const;

// export const GAME_CUBES: GAME_CUBES[] = [
//   { id: 0, targetId: 0, speed: 0.04, displayTime: 3 },
//   { id: 1, targetId: 3, speed: 0.04, displayTime: 3 },
//   { id: 2, targetId: 4, speed: 0.04, displayTime: 3 },
//   { id: 3, targetId: 2, speed: 0.04, displayTime: 5 },
//   { id: 4, targetId: 1, speed: 0.04, displayTime: 5 },
//   { id: 5, targetId: 5, speed: 0.04, displayTime: 6 },
//   { id: 6, targetId: 3, speed: 0.04, displayTime: 6 },
// ];

export const GAME_CUBES: GAME_CUBES[] = [
  // **Intro (0:00 - 0:35)**
  { id: 0, targetId: 1, speed: 0.02, displayTime: 2 }, // Soft start
  { id: 1, targetId: 4, speed: 0.02, displayTime: 4 },

  // **First Verse (0:35 - 1:06)**
  { id: 2, targetId: 0, speed: 0.03, displayTime: 7 }, // "Work it"
  { id: 3, targetId: 3, speed: 0.03, displayTime: 9 }, // "Make it"
  { id: 4, targetId: 2, speed: 0.03, displayTime: 11 }, // "Do it"
  { id: 5, targetId: 5, speed: 0.03, displayTime: 13 }, // "Makes us"

  // **Chorus (1:06 - 1:36) ("Harder, Better, Faster, Stronger")**
  { id: 6, targetId: 1, speed: 0.04, displayTime: 17 },
  { id: 7, targetId: 3, speed: 0.04, displayTime: 19 },
  { id: 8, targetId: 4, speed: 0.05, displayTime: 21 },
  { id: 9, targetId: 0, speed: 0.05, displayTime: 23 },
  { id: 10, targetId: 5, speed: 0.06, displayTime: 25 },
  { id: 11, targetId: 2, speed: 0.06, displayTime: 27 },

  // **Melodic Breakdown (1:36 - 2:36)**
  { id: 12, targetId: 1, speed: 0.03, displayTime: 32 },
  { id: 13, targetId: 4, speed: 0.03, displayTime: 35 },
  { id: 14, targetId: 3, speed: 0.03, displayTime: 38 },

  // **Build-Up to Final Chorus (2:36 - 3:44)**
  { id: 15, targetId: 0, speed: 0.05, displayTime: 42 },
  { id: 16, targetId: 3, speed: 0.05, displayTime: 44 },
  { id: 17, targetId: 1, speed: 0.06, displayTime: 46 },
  { id: 18, targetId: 5, speed: 0.06, displayTime: 48 },
  { id: 19, targetId: 2, speed: 0.07, displayTime: 50 },
  { id: 20, targetId: 4, speed: 0.07, displayTime: 52 },

  // **Final Energy Boost (3:10 - 3:44)**
  { id: 21, targetId: 1, speed: 0.08, displayTime: 60 },
  { id: 22, targetId: 3, speed: 0.08, displayTime: 62 },
  { id: 23, targetId: 4, speed: 0.08, displayTime: 64 },
  { id: 24, targetId: 5, speed: 0.09, displayTime: 66 },
  { id: 25, targetId: 0, speed: 0.09, displayTime: 68 },
  { id: 26, targetId: 2, speed: 0.09, displayTime: 70 },
];

export const CUBE_STATUS = {
  IDLE: 'idle',
  MOVING: 'moving',
  HIT: 'hit',
  MISS: 'miss',
} as const;
