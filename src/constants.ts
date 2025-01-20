import * as THREE from 'three';

export const DEBUG = {
  showPerformance: true,
  showLandmarks: false,
  showOrbitControls: true,
  showAxesHelper: true,
  showCameraHelper: false,
};

export const CAMERA_FOV = 75;
export const Z_POSITION_CAMERA = 5;
export const Z_POSITION_OFFSET = 0.98;
export const POSITIONS = [
  new THREE.Vector3(-0.75, 0.7, Z_POSITION_OFFSET),
  new THREE.Vector3(-0.75, 0, Z_POSITION_OFFSET),
  new THREE.Vector3(-0.75, -0.7, Z_POSITION_OFFSET),
  new THREE.Vector3(0.75, 0.7, Z_POSITION_OFFSET),
  new THREE.Vector3(0.75, 0, Z_POSITION_OFFSET),
  new THREE.Vector3(0.75, -0.7, Z_POSITION_OFFSET),
];
