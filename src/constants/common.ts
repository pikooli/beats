import * as THREE from 'three';

export const CAMERA_FOV = 75;
export const Z_POSITION_CAMERA = 5;
export const Z_BASIC_OFFSET = 0.98;
export const Z_START_POSITION_DEFAULT = -10;
export const GAME_DEFAULT_SPEED = 0.04;
export const CUBE_COLOR_DEFAULT = 'yellow';
export const CUBE_COLOR_HITTABLE = 'green';
export const CUBE_COLOR_UNHITTABLE = 'red';
export const LIMIT_DISTANCE_HIT = 0.5;
export const TARGET_COLLISION_THRESHOLD = 0.3;
export const POWER_FACTOR = 2;

export const START_CUBE_VECTOR = new THREE.Vector3(
  0,
  0,
  Z_START_POSITION_DEFAULT
);
