import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import * as THREE from 'three';

const DEFAULT_Z_COORD = 0.9855;

export const calculeBoundingBox = (
  landmarks: NormalizedLandmark[] | null,
  camera: THREE.Camera
) => {
  if (!landmarks) return {};
  const xCoordinates = landmarks.map((lm) => lm.x);
  const yCoordinates = landmarks.map((lm) => lm.y);

  const minX = Math.min(...xCoordinates);
  const maxX = Math.max(...xCoordinates);
  const minY = Math.min(...yCoordinates);
  const maxY = Math.max(...yCoordinates);

  const minClipX = -(minX - 0.5) * 2;
  const minClipY = (minY - 0.5) * -2;
  const maxClipX = -(maxX - 0.5) * 2;
  const maxClipY = (maxY - 0.5) * -2;

  const centerClipX = (minClipX + maxClipX) / 2;
  const centerClipY = (minClipY + maxClipY) / 2;

  const center = new THREE.Vector3(
    centerClipX,
    centerClipY,
    DEFAULT_Z_COORD
  ).unproject(camera);

  const positionMinY = new THREE.Vector3(
    minClipX,
    minClipY,
    DEFAULT_Z_COORD
  ).unproject(camera);
  const positionMaxY = new THREE.Vector3(
    minClipX,
    maxClipY,
    DEFAULT_Z_COORD
  ).unproject(camera);
  const positionMinX = new THREE.Vector3(
    minClipX,
    minClipY,
    DEFAULT_Z_COORD
  ).unproject(camera);
  const positionMaxX = new THREE.Vector3(
    maxClipX,
    minClipY,
    DEFAULT_Z_COORD
  ).unproject(camera);
  const sizeY = positionMaxY.y - positionMinY.y;
  const sizeX = positionMaxX.x - positionMinX.x;

  return { center, sizeY, sizeX };
};
