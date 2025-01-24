'use client';
import { useRef, useState } from 'react';
import { Game } from '@/components/games/Game';
import { View } from '@react-three/drei';
import { useGameStore } from '@/zustand/store';
import Mediapipe from '@/components/mediapipe/Mediapipe';

export default function Home() {
  const { isGameStarted, setIsGameStarted } = useGameStore();
  const [isGameInited, setIsGameInited] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="h-screen">
      <Mediapipe
        isGameInited={isGameInited}
        setIsGameStarted={setIsGameStarted}
        videoRef={videoRef}
      />
      {isGameStarted ? (
        <>
          <View className="absolute left-0 top-0 h-screen w-screen">
            <Game videoRef={videoRef} />
          </View>
        </>
      ) : (
        <button
          className="absolute left-1/2 top-1/2 z-50 rounded-md bg-blue-500 p-4 text-white"
          onClick={() => setIsGameInited(true)}
        >
          Start Game
        </button>
      )}
    </div>
  );
}
