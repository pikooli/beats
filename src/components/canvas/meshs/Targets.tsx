import { useRef } from 'react';
import * as THREE from 'three';
import { CUBES_TARGETS, START_CUBE_VECTOR } from '@/constants/common';
import { useThree, useFrame } from '@react-three/fiber';
import { Line, Instances, Instance } from '@react-three/drei';
import { calculeBoundingBox } from '@/utils/calculeSize';
import { useLandmarksStore } from '@/zustand/store';

const PREFIX = 'target-';
const COLLISION_THRESHOLD = 0.3;
const POWER_FACTOR = 2;

const Trajectory = () => {
  const { camera } = useThree();
  return (
    <>
      {CUBES_TARGETS.map((position) => {
        return (
          <Line
            key={`line-${position.id}`}
            points={[
              START_CUBE_VECTOR,
              new THREE.Vector3(position.x, position.y, position.z).unproject(
                camera
              ),
            ]}
            color={position.color}
          />
        );
      })}
    </>
  );
};

export const Targets = () => {
  const { camera } = useThree();
  const targetsRef = useRef<THREE.InstancedMesh>(null);
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

      if (distance < COLLISION_THRESHOLD) {
        if (targetsRef.current) {
          targetsRef.current.setColorAt(index, new THREE.Color('green'));
        }
      }
    });
  });

  return (
    <>
      <Trajectory />
      <Instances count={CUBES_TARGETS.length} ref={targetsRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial />
        {CUBES_TARGETS.map((position) => {
          return (
            <Instance
              key={position.id}
              name={`${PREFIX}${position.id}`}
              position={new THREE.Vector3(
                position.x,
                position.y,
                position.z
              ).unproject(camera)}
              color={position.color}
            />
          );
        })}
      </Instances>
    </>
  );
};
