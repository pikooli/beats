import * as THREE from 'three';

export const POWER_FACTOR = 2;

// POSITION
export const CAMERA_FOV = 75;
export const Z_POSITION_CAMERA = 5;
export const Z_BASIC_OFFSET = 0.98;
export const Z_START_POSITION_DEFAULT = -10;
export const LIMIT_DISTANCE_HIT = 0.5;
export const TARGET_COLLISION_THRESHOLD = 0.3;
export const START_CUBE_VECTOR = new THREE.Vector3(
  0,
  0,
  Z_START_POSITION_DEFAULT
);

// PREFIX
export const TARGET_PREFIX = 'target-';
export const LINE_PREFIX = 'line-';
export const CUBE_PREFIX = 'cube-';

// TIME
export const START_DELAY = 0;
export const GAME_DEFAULT_SPEED = 0.04;

// COLOR
export const CUBE_COLOR_DEFAULT = 'yellow';
export const CUBE_COLOR_HITTABLE = 'green';
export const CUBE_COLOR_UNHITTABLE = 'red';
export const MUSIC_NAME = 'Daft Punk - Harder, Better, Faster, Stronger.mp3';
