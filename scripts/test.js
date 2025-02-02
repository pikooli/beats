import fs from 'fs';
import path from 'path';

const randomTargetId = () => {
  return Math.floor(Math.random() * 4);
}

export const GAME_CUBES = [
];


const newGameCube = [];
for (let i = 0; i < GAME_CUBES.length; i++) {
  if (i % 2 === 0) {
    newGameCube.push({ ...GAME_CUBES[i], id: newGameCube.length, targetId: randomTargetId() });
  }
}

fs.writeFileSync(path.join(__dirname, 'test.json'), JSON.stringify(newGameCube, null, 2));
