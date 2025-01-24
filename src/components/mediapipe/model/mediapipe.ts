import { HandLandmarkerResult, HandLandmarker } from '@mediapipe/tasks-vision';
import { FilesetResolver } from '@mediapipe/tasks-vision';

const runningMode = 'VIDEO';

export class MediapipeModel {
  videoRef: React.RefObject<HTMLVideoElement>;
  lastVideoTimeRef = 0;
  isInitialized = false;
  handLandmarker: HandLandmarker | null = null;
  setResult: ((results: HandLandmarkerResult) => void) | null = null;

  constructor(videoRef: React.RefObject<HTMLVideoElement>) {
    this.videoRef = videoRef;
  }

  initUserMedia = async (
    setResult: (results: HandLandmarkerResult) => void,
    callback?: () => void
  ) => {
    try {
      if (this.isInitialized) {
        return;
      }
      this.setResult = setResult;
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
      );
      this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
          delegate: 'GPU',
        },
        runningMode: runningMode,
        numHands: 2,
      });
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
        },
      });

      if (this.videoRef.current) {
        this.videoRef.current.srcObject = stream;
        this.videoRef.current.addEventListener('loadeddata', () => {
          this.detectForVideo();
          callback?.();
          console.log('====== initUserMedia');
        });
      }
      this.isInitialized = true;
    } catch (err) {
      console.error('Error accessing webcam:', err);
      throw new Error('Error accessing webcam');
    }
  };

  detectForVideo = async () => {
    if (!this.videoRef.current || !this.handLandmarker) {
      return;
    }

    const startTimeMs = performance.now();

    if (this.lastVideoTimeRef !== this.videoRef.current.currentTime) {
      this.lastVideoTimeRef = this.videoRef.current.currentTime;

      const results = this.handLandmarker?.detectForVideo(
        this.videoRef.current,
        startTimeMs
      );
      if (results) {
        this.setResult?.(results);
      }
    }
    window.requestAnimationFrame(this.detectForVideo);
  };
}
