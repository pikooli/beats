import { useRef, useEffect } from 'react';
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

  const cubeRefs = useRef(
    GAME_CUBES.map(() => ({
      ref: null as THREE.Mesh<
        THREE.BoxGeometry,
        THREE.MeshBasicMaterial
      > | null,
      direction: new THREE.Vector3(),
      targetPosition: new THREE.Vector3(),
      hasPassedTarget: false,
      isVisible: false,
    }))
  );

  // const directionRef = useRef(new THREE.Vector3());
  // const targetPositionRef = useRef(new THREE.Vector3());
  // const hasPassedTarget = useRef(false);

  useEffect(() => {
    if (cubeRefs.current) {
      cubeRefs.current.forEach((cube, index) => {
        setTimeout(() => {
          cube.targetPosition = new THREE.Vector3(
            POSITIONS_TARGETS[GAME_CUBES[index].target].x,
            POSITIONS_TARGETS[GAME_CUBES[index].target].y,
            POSITIONS_TARGETS[GAME_CUBES[index].target].z
          ).unproject(camera);

          cube.direction
            .subVectors(cube.targetPosition, START_CUBE_VECTOR)
            .normalize();
        }, GAME_CUBES[index].displayTime);
      });
    }
  }, [camera]);

  useFrame(() => {
    if (cubeRefs.current) {
      cubeRefs.current.forEach((cube) => {
        if (!cube.ref) return;
        const currentPosition = cube.ref.position;

        const frustum = new THREE.Frustum();
        const cameraMatrix = new THREE.Matrix4().multiplyMatrices(
          camera.projectionMatrix,
          camera.matrixWorldInverse
        );
        frustum.setFromProjectionMatrix(cameraMatrix);

        if (!frustum.containsPoint(currentPosition)) {
          scene.remove(cube.ref);
          cube.ref = null; // Prevent further updates
          return;
        }

        const step = cube.direction.clone().multiplyScalar(GAME_DEFAULT_SPEED);
        currentPosition.add(step);
        const distanceToTarget = currentPosition.distanceTo(
          cube.targetPosition
        );

        if (distanceToTarget < 0.5 && !cube.hasPassedTarget) {
          cube.hasPassedTarget = true;
          cube.ref.material.color.set('green');
        }
        if (distanceToTarget > 0.5 && cube.hasPassedTarget) {
          cube.ref.material.color.set('red');
        }
      });
    }
  });

  return (
    <>
      <Common videoRef={videoRef} />

      {GAME_CUBES.map((cube, index) => (
        <mesh
          key={cube.id}
          ref={(el) => {
            if (el) {
              cubeRefs.current[index].ref = el;
            }
          }}
          position={START_CUBE_VECTOR.clone()}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color={cubeRefs.current[index].hasPassedTarget ? 'green' : 'yellow'}
          />
        </mesh>
      ))}
      <Targets />
    </>
  );
};
