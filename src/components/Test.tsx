import { useLandmarksStore } from '@/zustand/store';
import { BoundingBox } from '@/components/canvas/meshs/BoundingBox';

export const Test = () => {
  const { landmarks } = useLandmarksStore();
  if (!landmarks?.landmarks.length) return null;

  return (
    <>
      {landmarks.landmarks.map((landmark, idx) => (
        <BoundingBox key={idx} landmarks={landmark} />
      ))}
    </>
  );
};
