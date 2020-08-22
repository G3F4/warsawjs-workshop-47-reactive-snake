export const InitialGameContextState = { speed: 500, paused: true };

export function initGameContextState() {
  return InitialGameContextState;
}

export default function gameContextStateReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'increaseSpeed':
      return {
        ...state,
        speed: state.speed * payload,
      };
    case 'pauseGame':
      return {
        ...state,
        paused: true,
      };
    case 'unpauseGame':
      return {
        ...state,
        paused: false,
      };
    default:
      throw new Error(`unknown game state reducer action type: ${type}`);
  }
}
