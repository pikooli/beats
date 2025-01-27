import * as THREE from 'three';
import { create } from 'zustand';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';

interface GameState {
  isGameStarted: boolean;
  setIsGameStarted: (isGameStarted: boolean) => void;
}

export const useGameStore = create<GameState>()((set) => ({
  isGameStarted: false,
  setIsGameStarted: (isGameStarted) => set({ isGameStarted }),
}));

interface LandmarksState {
  landmarks: HandLandmarkerResult | null;
  setLandmarks: (landmarks: HandLandmarkerResult | null) => void;
}

export const useLandmarksStore = create<LandmarksState>()((set) => ({
  landmarks: null,
  setLandmarks: (landmarks) => set({ landmarks }),
}));

interface TargetsState {
  targets: THREE.InstancedMesh | null;
  setTargets: (targets: THREE.InstancedMesh | null) => void;
}

export const useTargetsStore = create<TargetsState>()((set) => ({
  targets: null,
  setTargets: (targets) => set({ targets }),
}));
