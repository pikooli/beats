import { useControls } from 'leva';

export const useLeva = () => {
  const { position } = useControls({
    position: { value: [0, 0, 0], step: 0.01 },
  });
  return { position };
};
