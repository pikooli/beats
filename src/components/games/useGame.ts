import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  START_CUBE_VECTOR,
  CUBE_COLOR_HITTABLE,
  CUBE_COLOR_UNHITTABLE,
  LIMIT_DISTANCE_HIT,
} from '@/constants/common';
import { GAME_CUBES, CUBES_TARGETS } from '@/constants/gameCube';
import { useTargetsStore } from '@/zustand/store';

const defineCubesData = () => {
  return GAME_CUBES.map((cube) => ({
    id: cube.id,
    targetId: cube.targetId,
    direction: new THREE.Vector3(),
    targetPosition: new THREE.Vector3(),
    hasPassedTarget: false,
    isVisible: true,
    step: new THREE.Vector3(),
    displayTime: cube.displayTime,
    speed: cube.speed,
  }));
};

export const useGame = () => {
  const { camera } = useThree();
  const frustumRef = useRef(new THREE.Frustum());
  const instanceRef = useRef<THREE.InstancedMesh>(null);
  const cubesDataRef = useRef(defineCubesData());
  const { passingTargets } = useTargetsStore();

  useEffect(() => {
    const cameraMatrix = new THREE.Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustumRef.current.setFromProjectionMatrix(cameraMatrix);

    cubesDataRef.current.forEach((cubeData) => {
      const target = CUBES_TARGETS.find(
        (target) => target.id === cubeData.targetId
      );
      if (!target) return;
      cubeData.targetPosition = new THREE.Vector3(
        target.x,
        target.y,
        target.z
      ).unproject(camera);

      cubeData.direction
        .subVectors(cubeData.targetPosition, START_CUBE_VECTOR)
        .normalize();
      cubeData.step = cubeData.direction.clone().multiplyScalar(cubeData.speed);
    });
  }, [camera]);

  useFrame((state) => {
    if (instanceRef.current) {
      const elapsedTime = state.clock.getElapsedTime();

      instanceRef.current.children.forEach((cube) => {
        const cubeData = cube.userData;
        if (!cubeData.isVisible || cubeData.displayTime > elapsedTime) {
          return;
        }
        const currentPosition = cube.position;

        if (!frustumRef.current.containsPoint(currentPosition)) {
          cube.scale.set(0, 0, 0);
          cubeData.isVisible = false;
          return;
        }

        cube.position.add(cubeData.step);
        const distanceToTarget = currentPosition.distanceTo(
          cubeData.targetPosition
        );

        if (
          distanceToTarget < LIMIT_DISTANCE_HIT &&
          !cubeData.hasPassedTarget
        ) {
          cubesDataRef.current[cubeData.id].hasPassedTarget = true;
          // @ts-expect-error color is not a property of the cube
          cube.color.set(CUBE_COLOR_HITTABLE);
          if (!passingTargets.has(cubeData.targetId)) {
            passingTargets.add(cubeData.targetId);
          }
          return;
        }
        if (passingTargets.has(cubeData.targetId)) {
          passingTargets.delete(cubeData.targetId);
        }
        if (distanceToTarget > LIMIT_DISTANCE_HIT && cubeData.hasPassedTarget) {
          // @ts-expect-error color is not a property of the cube
          cube.color.set(CUBE_COLOR_UNHITTABLE);
        }
      });
    }
  });

  return {
    cubesDataRef,
    instanceRef,
    frustumRef,
  };
};
