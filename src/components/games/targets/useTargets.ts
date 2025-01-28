import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TARGET_COLLISION_THRESHOLD, POWER_FACTOR } from '@/constants/common';
import { CUBES_TARGETS } from '@/constants/gameCube';
import { useLandmarksStore, useTargetsStore } from '@/zustand/store';
import { calculeBoundingBox } from '@/utils/calculeSize';

export const useTargets = () => {
  const targetsRef = useRef<THREE.InstancedMesh>(null);
  const { passingTargets } = useTargetsStore();
  const { camera } = useThree();
  const { landmarks } = useLandmarksStore();

  useFrame(() => {
    if (!landmarks?.landmarks.length) return;
    const { sizeY, sizeX, center } = calculeBoundingBox(
      landmarks?.landmarks[0] || null,
      camera
    );
    if (!sizeY || !sizeX || !center) return;

    CUBES_TARGETS.forEach((target, index) => {
      const targetPosition = new THREE.Vector3(target.x, target.y, 0).unproject(
        camera
      );

      const targetNDC = targetPosition.clone().project(camera);
      const centerNDC = center.clone().project(camera);

      const distance = Math.sqrt(
        Math.pow(targetNDC.x - centerNDC.x, POWER_FACTOR) +
          Math.pow(targetNDC.y - centerNDC.y, POWER_FACTOR)
      );

      if (distance < TARGET_COLLISION_THRESHOLD) {
        if (targetsRef.current) {
          targetsRef.current.setColorAt(index, new THREE.Color('green'));
          if (!passingTargets.has(target.id)) {
            passingTargets.add(target.id);
          }
        }
      } else {
        if (passingTargets.has(target.id)) {
          passingTargets.delete(target.id);
        }
      }
    });
  });

  return { targetsRef };
};
