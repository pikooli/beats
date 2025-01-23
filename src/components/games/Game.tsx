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
import { Targets } from '@/components/canvas/meshs/Targets';

interface GameProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const Game = ({ videoRef }: GameProps) => {
  const { camera, scene } = useThree();
  const { position } = useLeva();

  const cubeRef =
    useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>>(null);

  const directionRef = useRef(new THREE.Vector3());
  const targetPositionRef = useRef(new THREE.Vector3());
  const hasPassedTarget = useRef(false);

  useEffect(() => {
    if (cubeRef.current) {
      targetPositionRef.current = new THREE.Vector3(
        POSITIONS_TARGETS[3].x,
        POSITIONS_TARGETS[3].y,
        POSITIONS_TARGETS[3].z
      ).unproject(camera);

      directionRef.current
        .subVectors(targetPositionRef.current, START_CUBE_VECTOR)
        .normalize();
    }
  }, [camera]);

  useFrame(() => {
    if (cubeRef.current) {
      const currentPosition = cubeRef.current.position;

      const frustum = new THREE.Frustum();
      const cameraMatrix = new THREE.Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      );
      frustum.setFromProjectionMatrix(cameraMatrix);

      if (!frustum.containsPoint(currentPosition)) {
        scene.remove(cubeRef.current);
        cubeRef.current = null; // Prevent further updates
        return;
      }

      const step = directionRef.current
        .clone()
        .multiplyScalar(GAME_DEFAULT_SPEED);
      currentPosition.add(step);
      const distanceToTarget = currentPosition.distanceTo(
        targetPositionRef.current
      );

      if (distanceToTarget < 0.5 && !hasPassedTarget.current) {
        hasPassedTarget.current = true;
        cubeRef.current.material.color.set('green');
      }
      if (distanceToTarget > 0.5 && hasPassedTarget.current) {
        hasPassedTarget.current = false;
        cubeRef.current.material.color.set('red');
      }
    }
  });

  return (
    <>
      <Common videoRef={videoRef} />
      <mesh name="cube" ref={cubeRef} position={START_CUBE_VECTOR.clone()}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color={hasPassedTarget.current ? 'green' : 'yellow'}
        />
      </mesh>
      <Targets />
    </>
  );
};
