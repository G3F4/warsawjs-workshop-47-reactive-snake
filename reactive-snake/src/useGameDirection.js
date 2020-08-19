import { useEffect, useRef } from 'react';

export default function useGameDirection(initialDirection) {
  const direction = useRef(initialDirection);

  function handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
      direction.current = 'up';
    } else if (event.key === 'ArrowDown') {
      direction.current = 'down';
    } else if (event.key === 'ArrowLeft') {
      direction.current = 'left';
    } else if (event.key === 'ArrowRight') {
      direction.current = 'right';
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return direction;
}