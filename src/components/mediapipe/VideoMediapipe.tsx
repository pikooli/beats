import { useEffect } from 'react';
import { MediapipeModel } from '@/components/mediapipe/model/mediapipe';

interface VideoMediapipeProps {
  mediapipeRef: React.RefObject<MediapipeModel | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const VideoMediapipe = ({
  mediapipeRef,
  videoRef,
}: VideoMediapipeProps) => {
  useEffect(() => {
    if (videoRef.current) {
      // @ts-expect-error videoRef can be null
      mediapipeRef.current = new MediapipeModel(videoRef);
    }
  }, [mediapipeRef, videoRef]);

  return (
    <video
      // @ts-expect-error videoRef can be null
      ref={videoRef}
      autoPlay
      playsInline
      className={`hidden h-screen`}
    />
  );
};
