import * as THREE from 'three';
import { POSITIONS_TARGETS, START_CUBE_VECTOR } from '@/constants/common';
import { useThree } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import { Line } from '@react-three/drei';

const Trajectory = () => {
  const { camera } = useThree();
  return (
    <>
      {POSITIONS_TARGETS.map((position) => {
        return (
          <Line
            key={`line-${position.index}`}
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
      <Instances count={POSITIONS_TARGETS.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial />
        {POSITIONS_TARGETS.map((position) => {
          return (
            <Instance
              key={position.index}
              name={`target-${position.index}`}
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
