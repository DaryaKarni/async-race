import { State} from "./types";

const dafaultState: State = {
  view: "garage",
  garagePage: 1,
  winnerPage: 1,
  createInput: '',
  updateInput: '',
  createColor: '#ffff',
  updateColor: '#ffff',
  carsCount: 0,
  winnersCount: 0,
  selectedId: null,
  tableNumber: 1,
  winners: [],
}

function createStore(state: State){
  let currentState: State = state;
  const listeners: ((state: State) => void)[] = [];
  return {
    getState: () => currentState,
    subscribe: (listener: (state: State) => void ): object => {
      listeners.push(listener);
      return () => {
        const indexListener = listeners.indexOf(listener);
        if(indexListener !== -1) listeners.splice(indexListener, 1);
      }
    },
    dispatch: (functionOrState: ((state: State) => State) | State) => {
      const nextState: State = typeof functionOrState === 'function'
      ? functionOrState(currentState) : functionOrState;
      if(nextState !== currentState){
        currentState = nextState;
      }
      for(const listener of listeners) {
        listener(currentState);
      };
    }
  }
}
export const store = createStore(dafaultState);