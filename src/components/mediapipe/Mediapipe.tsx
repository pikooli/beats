'use client';
import { useEffect, useRef } from 'react';
import { useLandmarksStore } from '@/zustand/store';
import { MediapipeModel } from '@/components/mediapipe/model/mediapipe';
import { VideoMediapipe } from '@/components/mediapipe/VideoMediapipe';
import { HelperModel } from '@/components/mediapipe/helper/model/helperModel';
import { HelperComponent } from '@/components/mediapipe/helper/HelperComponent';
import { DEBUG } from '@/constants/debug';

export default function Mediapipe({
  isGameInited,
  setIsGameStarted,
  videoRef,
}: {
  isGameInited: boolean;
  setIsGameStarted: (isGameStarted: boolean) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}) {
  const { landmarks, setLandmarks } = useLandmarksStore();
  const mediapipeRef = useRef<MediapipeModel | null>(null);
  const helperRef = useRef<HelperModel | null>(null);

  useEffect(() => {
    if (isGameInited) {
      mediapipeRef.current?.initUserMedia(() => {
        setIsGameStarted(true);
        helperRef.current?.resizeCanvas(window.innerWidth, window.innerHeight);
        mediapipeRef.current?.onMessage(setLandmarks);
      });
    }
  }, [isGameInited, setIsGameStarted, setLandmarks]);

  return (
    <div className="absolute left-0 top-0 h-screen">
      <VideoMediapipe videoRef={videoRef} mediapipeRef={mediapipeRef} />
      <HelperComponent
        helperRef={helperRef}
        landmarks={landmarks}
        showHelper={DEBUG.showLandmarks}
      />
    </div>
  );
}
