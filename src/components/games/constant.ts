interface GAME_CUBES {
  id: number;
  target: number;
  speed: number;
  displayTime: number;
}

export const GAME_CUBES: GAME_CUBES[] = [
  { id: 0, target: 0, speed: 0.04, displayTime: 1000 },
  { id: 1, target: 3, speed: 0.04, displayTime: 1000 },
  { id: 2, target: 4, speed: 0.04, displayTime: 1000 },
  { id: 3, target: 2, speed: 0.04, displayTime: 2000 },
  { id: 4, target: 1, speed: 0.04, displayTime: 2000 },
  { id: 5, target: 5, speed: 0.04, displayTime: 3000 },
  { id: 6, target: 3, speed: 0.04, displayTime: 3000 },
];
