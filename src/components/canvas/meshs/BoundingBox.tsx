'use client';
import { useLandmarksStore } from '@/zustand/store';
import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { calculeBoundingBox } from '@/utils/calculeSize';
import { Box } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export const BoundingMarker = ({
  landmarks,
}: {
  landmarks: NormalizedLandmark[] | null;
}) => {
  const { camera } = useThree();
  if (!landmarks) return null;

  const { sizeY, sizeX, center } = calculeBoundingBox(landmarks, camera);

  if (!sizeY || !sizeX || !center) return null;

  return (
    <mesh name="bounding-box" position={center}>
      <Box args={[sizeX, sizeY]}>
        <meshBasicMaterial opacity={0.4} transparent={true} color="blue" />
      </Box>
    </mesh>
  );
};

export const BoundingBox = () => {
  const { landmarks } = useLandmarksStore();
  if (!landmarks?.landmarks.length) return null;

  return (
    <>
      {landmarks.landmarks.map((landmark, idx) => (
        <BoundingMarker key={idx} landmarks={landmark} />
      ))}
    </>
  );
};
