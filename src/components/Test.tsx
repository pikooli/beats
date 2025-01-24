import { useLandmarksStore } from '@/zustand/store';
import { useThree } from '@react-three/fiber';
import { BoundingBox } from '@/components/canvas/meshs/BoundingBox';

export const Test = () => {
  const { landmarks } = useLandmarksStore();

  return <BoundingBox landmarks={landmarks?.landmarks[0] || null} />;
};
