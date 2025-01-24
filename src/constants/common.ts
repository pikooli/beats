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

export const CUBES_TARGETS = [
  { id: 0, x: -0.75, y: 0.7, z: Z_POSITION_OFFSET, color: '#FF5733' },
  { id: 1, x: -0.75, y: 0, z: Z_POSITION_OFFSET, color: '#33FF57' },
  { id: 2, x: -0.75, y: -0.7, z: Z_POSITION_OFFSET, color: '#3357FF' },
  { id: 3, x: 0.75, y: 0.7, z: Z_POSITION_OFFSET, color: '#FF33A1' },
  { id: 4, x: 0.75, y: 0, z: Z_POSITION_OFFSET, color: '#A133FF' },
  { id: 5, x: 0.75, y: -0.7, z: Z_POSITION_OFFSET, color: '#33FFA1' },
] as const;
