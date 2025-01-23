import * as THREE from 'three';

export const CAMERA_FOV = 75;
export const Z_POSITION_CAMERA = 5;
export const Z_POSITION_OFFSET = 0.98;
export const Z_START_POSITION_DEFAULT = -10;
export const GAME_DEFAULT_SPEED = 0.04;

export const START_CUBE_VECTOR = new THREE.Vector3(
  0,
  0,
  Z_START_POSITION_DEFAULT
);

export const POSITIONS_TARGETS = [
  { index: 0, x: -0.75, y: 0.7, z: Z_POSITION_OFFSET, color: '#FF5733' },
  { index: 1, x: -0.75, y: 0, z: Z_POSITION_OFFSET, color: '#33FF57' },
  { index: 2, x: -0.75, y: -0.7, z: Z_POSITION_OFFSET, color: '#3357FF' },
  { index: 3, x: 0.75, y: 0.7, z: Z_POSITION_OFFSET, color: '#FF33A1' },
  { index: 4, x: 0.75, y: 0, z: Z_POSITION_OFFSET, color: '#A133FF' },
  { index: 5, x: 0.75, y: -0.7, z: Z_POSITION_OFFSET, color: '#33FFA1' },
] as const;
