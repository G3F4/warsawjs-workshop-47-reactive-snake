import { useEffect } from 'react';

export default function useSpaceDownEvent(handler) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 32) {
        handler();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handler]);
}