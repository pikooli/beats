import * as THREE from 'three';
import { CUBES_TARGETS, START_CUBE_VECTOR } from '@/constants/common';
import { useThree } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import { Line } from '@react-three/drei';

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

  return (
    <>
      <Trajectory />
      <Instances count={CUBES_TARGETS.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial />
        {CUBES_TARGETS.map((position) => {
          return (
            <Instance
              key={position.id}
              name={`target-${position.id}`}
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
