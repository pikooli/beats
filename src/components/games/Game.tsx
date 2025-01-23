import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Common } from '@/components/canvas/Common';
import { useLeva } from '@/components/useLeva';
import {
  POSITIONS_TARGETS,
  START_CUBE_VECTOR,
  GAME_DEFAULT_SPEED,
} from '@/constants/common';
import { GAME_CUBES } from './constant';
import { Targets } from '@/components/canvas/meshs/Targets';
import { Instances, Instance } from '@react-three/drei';

interface GameProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const Game = ({ videoRef }: GameProps) => {
  const { camera, scene } = useThree();
  const { position } = useLeva();
  const instanceRef = useRef<THREE.InstancedMesh>(null);

  const cubesDataRef = useRef(
    GAME_CUBES.map((cube) => ({
      id: cube.id,
      direction: new THREE.Vector3(),
      targetPosition: new THREE.Vector3(),
      hasPassedTarget: false,
      isVisible: false,
    }))
  );

  useEffect(() => {
    cubesDataRef.current.forEach((cube, index) => {
      setTimeout(() => {
        cube.targetPosition = new THREE.Vector3(
          POSITIONS_TARGETS[GAME_CUBES[index].target].x,
          POSITIONS_TARGETS[GAME_CUBES[index].target].y,
          POSITIONS_TARGETS[GAME_CUBES[index].target].z
        ).unproject(camera);

        cube.direction
          .subVectors(cube.targetPosition, START_CUBE_VECTOR)
          .normalize();
        cube.isVisible = true;
      }, GAME_CUBES[index].displayTime);
    });
  }, [camera]);

  console.log('cubesDataRef', cubesDataRef);
  const frustum = new THREE.Frustum();
  const cameraMatrix = new THREE.Matrix4().multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );
  frustum.setFromProjectionMatrix(cameraMatrix);

  useFrame(() => {
    if (instanceRef.current) {
      instanceRef.current.children.forEach((cube) => {
        const cubeData = cubesDataRef.current.find(
          (cubeData) => cube.name === `cube-${cubeData.id}`
        );
        if (!cubeData || !cubeData.isVisible) return;
        const currentPosition = cube.position;

        if (!frustum.containsPoint(currentPosition)) {
          // remove from scene
          return;
        }

        const step = cubeData.direction
          .clone()
          .multiplyScalar(GAME_DEFAULT_SPEED);
        cube.position.add(step);
        const distanceToTarget = currentPosition.distanceTo(
          cubeData.targetPosition
        );

        if (distanceToTarget < 0.5 && !cubeData.hasPassedTarget) {
          cubesDataRef.current[cubeData.id].hasPassedTarget = true;
          cube.color.set('green');
        }
        if (distanceToTarget > 0.5 && cubeData.hasPassedTarget) {
          // cubesDataRef.current[cubeData.id].isVisible = false;
          cube.color.set('red');
        }
      });
    }
  });

  return (
    <>
      <Common videoRef={videoRef} />
      <Instances count={GAME_CUBES.length} ref={instanceRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial />
        {GAME_CUBES.map((cube) => (
          <Instance
            key={cube.id}
            name={`cube-${cube.id}`}
            position={START_CUBE_VECTOR.clone()}
            color={
              cubesDataRef.current[cube.id].hasPassedTarget ? 'green' : 'yellow'
            }
          />
        ))}
      </Instances>
      <Targets />
    </>
  );
};
