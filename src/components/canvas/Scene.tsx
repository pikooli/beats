'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { View } from '@react-three/drei';

export default function Scene({ ...props }) {
  return (
    <Canvas {...props} shadows={true}>
      <View.Port />
      <Preload all />
    </Canvas>
  );
}
