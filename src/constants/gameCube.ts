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

export const GAME_CUBES: GAME_CUBES[] = [
  { id: 0, targetId: 0, speed: 0.04, displayTime: 3 },
  { id: 1, targetId: 3, speed: 0.04, displayTime: 3 },
  { id: 2, targetId: 4, speed: 0.04, displayTime: 3 },
  { id: 3, targetId: 2, speed: 0.04, displayTime: 5 },
  { id: 4, targetId: 1, speed: 0.04, displayTime: 5 },
  { id: 5, targetId: 5, speed: 0.04, displayTime: 6 },
  { id: 6, targetId: 3, speed: 0.04, displayTime: 6 },
];

export const CUBE_STATUS = {
  IDLE: 'idle',
  MOVING: 'moving',
  HIT: 'hit',
  MISS: 'miss',
} as const;
