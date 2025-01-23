'use client';
import { Suspense, useEffect } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { CAMERA_FOV, Z_POSITION_CAMERA } from '@/constants/common';
import { DEBUG } from '@/constants/debug';

export const Common = ({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {
  const { scene, camera } = useThree();

  useEffect(() => {
    if (videoRef.current) {
      const videoTexture = new THREE.VideoTexture(videoRef.current);
      videoTexture.colorSpace = THREE.SRGBColorSpace;
      videoTexture.wrapS = THREE.RepeatWrapping;
      videoTexture.repeat.x = -1;
      scene.background = videoTexture;
    }
  }, [scene, videoRef]);

  useEffect(() => {
    if (DEBUG.showCameraHelper) {
      const helper = new THREE.CameraHelper(camera);
      scene.add(helper);
    }
  }, [camera, scene]);

  return (
    <Suspense fallback={null}>
      {DEBUG.showPerformance && <Perf position="top-left" />}
      {DEBUG.showAxesHelper && <axesHelper args={[10]} />}
      {DEBUG.showOrbitControls && <OrbitControls />}
      <ambientLight intensity={0.5} />
      <PerspectiveCamera
        name="default"
        makeDefault={true}
        fov={CAMERA_FOV}
        near={0.1}
        far={1000000000000000}
        position={new THREE.Vector3(0, 0, Z_POSITION_CAMERA)}
      />
    </Suspense>
  );
};
