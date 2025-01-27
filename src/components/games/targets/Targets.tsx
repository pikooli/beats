import * as THREE from 'three';
import {
  START_CUBE_VECTOR,
  TARGET_PREFIX,
  LINE_PREFIX,
} from '@/constants/common';
import { CUBES_TARGETS } from '@/constants/gameCube';
import { useThree } from '@react-three/fiber';
import { Line, Instances, Instance } from '@react-three/drei';
import { useTargets } from '@/components/games/targets/useTargets';

const Trajectory = () => {
  const { camera } = useThree();
  return (
    <>
      {CUBES_TARGETS.map((position) => {
        return (
          <Line
            key={`${LINE_PREFIX}${position.id}`}
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
  const { targetsRef } = useTargets();

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
              name={`${TARGET_PREFIX}${position.id}`}
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
