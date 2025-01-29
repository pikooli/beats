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
    if (!targetsRef.current) return;
    passingTargets.clear();
    targetsRef.current.children.forEach((child) => {
      child.scale.set(1, 1, 1);
    });

    if (!landmarks?.landmarks.length) return;
    for (let i = 0; i < landmarks.landmarks.length; i++) {
      const landmark = landmarks.landmarks[i];
      const { sizeY, sizeX, center } = calculeBoundingBox(landmark, camera);
      if (!sizeY || !sizeX || !center) return;

      for (let j = 0; j < CUBES_TARGETS.length; j++) {
        const target = CUBES_TARGETS[j];
        const targetPosition = new THREE.Vector3(
          target.x,
          target.y,
          0
        ).unproject(camera);

        const targetNDC = targetPosition.clone().project(camera);
        const centerNDC = center.clone().project(camera);

        const distance = Math.sqrt(
          Math.pow(targetNDC.x - centerNDC.x, POWER_FACTOR) +
            Math.pow(targetNDC.y - centerNDC.y, POWER_FACTOR)
        );

        if (distance < TARGET_COLLISION_THRESHOLD) {
          targetsRef.current.setColorAt(j, new THREE.Color('green'));
          targetsRef.current.children[j].scale.set(2, 2, 2);
          if (!passingTargets.has(target.id)) {
            passingTargets.add(target.id);
          }
        }
      }
    }
  });

  return { targetsRef };
};
