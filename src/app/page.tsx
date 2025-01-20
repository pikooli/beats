'use client';
import { useRef } from 'react';
import { Game } from '@/components/games/Game';
import { View } from '@react-three/drei';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="h-screen w-screen">
      <View className="absolute left-0 top-0 h-screen w-screen">
        <Game videoRef={videoRef} />
      </View>
    </div>
  );
}
