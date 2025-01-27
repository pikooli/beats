import { Common } from '@/components/canvas/Common';
import {
  START_CUBE_VECTOR,
  CUBE_COLOR_DEFAULT,
  CUBE_PREFIX,
} from '@/constants/common';
import { GAME_CUBES, CUBES_TARGETS } from '@/constants/gameCube';
import { Targets } from '@/components/games/targets/Targets';
import { Instances, Instance } from '@react-three/drei';
import { useGame } from './useGame';

interface GameProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const Game = ({ videoRef }: GameProps) => {
  const { cubesDataRef, instanceRef } = useGame();

  return (
    <>
      <Common videoRef={videoRef} />
      <Instances count={GAME_CUBES.length} ref={instanceRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial />
        {GAME_CUBES.map((cube) => (
          <Instance
            key={cube.id}
            name={`${CUBE_PREFIX}${cube.id}`}
            position={START_CUBE_VECTOR.clone()}
            color={
              CUBES_TARGETS.find((target) => target.id === cube.targetId)
                ?.color || CUBE_COLOR_DEFAULT
            }
            userData={cubesDataRef.current.find(
              (cubeData) => cube.id === cubeData.id
            )}
          />
        ))}
      </Instances>
      <Targets activeTargetsRef={activeTargetsRef} />
    </>
  );
};
