import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Common } from '@/components/canvas/Common';
// import { useLeva } from '@/components/useLeva';
import {
  CUBES_TARGETS,
  START_CUBE_VECTOR,
  GAME_DEFAULT_SPEED,
} from '@/constants/common';
import { GAME_CUBES } from './constant';
import { Targets } from '@/components/canvas/meshs/Targets';
import { Instances, Instance } from '@react-three/drei';

interface GameProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const CUBE_COLOR_DEFAULT = 'yellow';
const CUBE_COLOR_HITTABLE = 'green';
const CUBE_COLOR_UNHITTABLE = 'red';

const defineCubesData = () => {
  return GAME_CUBES.map((cube) => ({
    id: cube.id,
    targetId: cube.target,
    direction: new THREE.Vector3(),
    targetPosition: new THREE.Vector3(),
    hasPassedTarget: false,
    isVisible: false,
  }));
};

export const Game = ({ videoRef }: GameProps) => {
  const { camera } = useThree();
  // const { position } = useLeva();
  const frustumRef = useRef(new THREE.Frustum());
  const instanceRef = useRef<THREE.InstancedMesh>(null);
  const cubesDataRef = useRef(defineCubesData());

  useEffect(() => {
    const cameraMatrix = new THREE.Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );

    frustumRef.current.setFromProjectionMatrix(cameraMatrix);
  }, [camera]);

  useEffect(() => {
    cubesDataRef.current.forEach((cubeData, index) => {
      setTimeout(() => {
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
        cubeData.isVisible = true;
      }, GAME_CUBES[index].displayTime);
    });
  }, [camera]);

  useFrame(() => {
    if (instanceRef.current) {
      instanceRef.current.children.forEach((cube) => {
        const cubeData = cube.userData;
        if (!cubeData || !cubeData.isVisible) return;
        const currentPosition = cube.position;

        if (!frustumRef.current.containsPoint(currentPosition)) {
          cube.scale.set(0, 0, 0);
          cubeData.isVisible = false;
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
          // @ts-expect-error color is not a property of the cube
          cube.color.set(CUBE_COLOR_HITTABLE);
        }
        if (distanceToTarget > 0.5 && cubeData.hasPassedTarget) {
          // @ts-expect-error color is not a property of the cube
          cube.color.set(CUBE_COLOR_UNHITTABLE);
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
              CUBES_TARGETS.find((target) => target.id === cube.target)
                ?.color || CUBE_COLOR_DEFAULT
            }
            userData={cubesDataRef.current.find(
              (cubeData) => cube.id === cubeData.id
            )}
          />
        ))}
      </Instances>
      <Targets />
    </>
  );
};
