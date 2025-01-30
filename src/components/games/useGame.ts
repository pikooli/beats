import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  START_CUBE_VECTOR,
  CUBE_COLOR_HITTABLE,
  CUBE_COLOR_UNHITTABLE,
  LIMIT_DISTANCE_HIT,
  START_DELAY,
} from '@/constants/common';
import { GAME_CUBES, CUBES_TARGETS, CUBE_STATUS } from '@/constants/gameCube';
import { useTargetsStore, useScoreStore, useTimeStore } from '@/zustand/store';

const defineCubesData = () => {
  return GAME_CUBES.map((cube) => ({
    id: cube.id,
    targetId: cube.targetId,
    direction: new THREE.Vector3(),
    targetPosition: new THREE.Vector3(),
    hasPassedTarget: false,
    isVisible: true,
    step: new THREE.Vector3(),
    displayTime: cube.displayTime + START_DELAY,
    speed: cube.speed,
    position: START_CUBE_VECTOR.clone(),
    status: CUBE_STATUS.IDLE,
  }));
};

export const useGame = () => {
  const { camera } = useThree();
  const frustumRef = useRef(new THREE.Frustum());
  const instanceRef = useRef<THREE.InstancedMesh>(null);
  const cubesDataRef = useRef(defineCubesData());
  const { passingTargets } = useTargetsStore();
  const { addScore } = useScoreStore();
  const { totalPausedTime, isPaused, time } = useTimeStore();

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

  useFrame(() => {
    if (instanceRef.current && !isPaused) {
      const elapsedTime = time.getElapsedTime() - totalPausedTime;

      for (let i = 0; i < instanceRef.current.children.length; i++) {
        const cube = instanceRef.current.children[i];
        const cubeData = cube.userData;
        if (!cubeData.isVisible || cubeData.displayTime > elapsedTime) {
          continue;
        }
        const currentPosition = cube.position;

        if (!frustumRef.current.containsPoint(currentPosition)) {
          cube.scale.set(0, 0, 0);
          cubeData.isVisible = false;
          continue;
        }
        cubeData.position.add(cubeData.step);
        cube.position.copy(cubeData.position);
        const distanceToTarget = currentPosition.distanceTo(
          cubeData.targetPosition
        );

        if (
          distanceToTarget < LIMIT_DISTANCE_HIT &&
          !cubeData.hasPassedTarget
        ) {
          cubeData.hasPassedTarget = true;
          // @ts-expect-error color is not a property of the cube
          cube.color.set(CUBE_COLOR_HITTABLE);
          if (passingTargets.has(cubeData.targetId)) {
            addScore(1);
            cube.scale.set(0, 0, 0);
            // TODO: fix this
            // playSound('hit');
            cubeData.status = CUBE_STATUS.HIT;
          }
          continue;
        }
        if (distanceToTarget > LIMIT_DISTANCE_HIT && cubeData.hasPassedTarget) {
          // @ts-expect-error color is not a property of the cube
          cube.color.set(CUBE_COLOR_UNHITTABLE);
          if (
            cubeData.status !== CUBE_STATUS.MISS &&
            cubeData.status !== CUBE_STATUS.HIT
          ) {
            cubeData.status = CUBE_STATUS.MISS;
          }
        }
      }
    }
  });

  return {
    cubesDataRef,
    instanceRef,
    frustumRef,
  };
};
