'use client';
import { useRef } from 'react';
import { Game } from '@/components/games/Game';
import { View } from '@react-three/drei';
import { useGameStore } from '@/zustand/store';

export default function Home() {
  const { isGameStarted, setIsGameStarted } = useGameStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="h-screen w-screen">
      {isGameStarted ? (
        <View className="absolute left-0 top-0 h-screen w-screen">
          <Game videoRef={videoRef} />
        </View>
      ) : (
        <button
          className="absolute left-1/2 top-1/2 z-50 rounded-md bg-blue-500 p-4 text-white"
          onClick={() => setIsGameStarted(true)}
        >
          Start Game
        </button>
      )}
    </div>
  );
}
