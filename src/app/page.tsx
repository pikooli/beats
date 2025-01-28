'use client';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Game } from '@/components/games/Game';
import { View } from '@react-three/drei';
import { useGameStore, useScoreStore } from '@/zustand/store';
import { Test } from '@/components/Test';

const Mediapipe = dynamic(() => import('@/components/mediapipe/Mediapipe'), {
  ssr: false,
});

const Score = () => {
  const { score } = useScoreStore();
  return (
    <div className="absolute right-0 top-0 z-50 rounded-md bg-blue-500 p-4 text-black">
      Score: {score}
    </div>
  );
};

export default function Home() {
  const { isGameStarted, setIsGameStarted } = useGameStore();
  const [isGameInited, setIsGameInited] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="h-screen">
      <Score />
      <Mediapipe
        isGameInited={isGameInited}
        setIsGameStarted={setIsGameStarted}
        videoRef={videoRef}
      />
      {isGameStarted ? (
        <>
          <View className="absolute left-0 top-0 h-screen w-screen">
            <Game videoRef={videoRef} />
            <Test />
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
