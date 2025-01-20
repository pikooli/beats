import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Common } from '@/components/canvas/Common';
import { useLeva } from '@/components/useLeva';
import { POSITIONS } from '@/constants';

interface GameProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const Game = ({ videoRef }: GameProps) => {
  const { camera } = useThree();
  const { position } = useLeva();
  const cubeRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0); // Start at 0 (0% progress)

  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  useFrame(() => {
    if (cubeRef.current) {
      const startPosition = new THREE.Vector3(0, 0, 0);
      const targetPosition = new THREE.Vector3(0.75, 0.7, 0.98).unproject(
        camera
      );
      const speed = 0.001;

      progressRef.current = Math.min(progressRef.current + speed, 1);
      const easedProgress = easeInOutQuad(progressRef.current);

      cubeRef.current.position.lerpVectors(
        startPosition,
        targetPosition,
        easedProgress
      );

      const scale = THREE.MathUtils.lerp(0.1, 1, easedProgress); // Scale from 0.1 to 1
      cubeRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <Common videoRef={videoRef} />

      <mesh
        ref={cubeRef}
        position={new THREE.Vector3(position[0], position[1], position[2])}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>
      {/* {POSITIONS.map((position, index) => {
        return (
          <mesh key={index} position={position.unproject(camera)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="red" />
          </mesh>
        );
      })} */}
    </>
  );
};
