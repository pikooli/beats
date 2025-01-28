import { useLandmarksStore } from '@/zustand/store';
import { BoundingBox } from '@/components/canvas/meshs/BoundingBox';

export const Test = () => {
  const { landmarks } = useLandmarksStore();

  return <BoundingBox landmarks={landmarks?.landmarks?.[0] || null} />;
};
