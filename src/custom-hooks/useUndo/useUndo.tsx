import { useReducer, useCallback } from 'react';

type Action<T> =
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET'; payload: { value: T } }
  | { type: 'RESET' };

interface State<T> {
  past: T[];
  present: T;
  future: T[];
}
type Reducer<T> = (state: State<T>, Action: Action<T>) => State<T>;

const initialState = {
  past: [],
  present: null,
  future: [],
};

const undoReducer: Reducer<any> = <T,>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'UNDO': {
      if (state.past.length === 0) {
        return state;
      }

      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future],
      };
    }

    case 'REDO': {
      if (state.future.length === 0) {
        return state; // No future states to redo to; return the current state.
      }

      const next = state.future[0];
      const newFuture = state.future.slice(1);

      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture,
      };
    }

    case 'SET': {
      const stateValue = action.payload.value;
      if (stateValue === state.present) {
        return state; // No change in state; return the current state.
      }
      return {
        past: [...state.past, state.present],
        present: stateValue,
        future: [],
      };
    }

    case 'RESET': {
      return {
        ...initialState,
        present: initialState.present, // Keep the present property from initialState
      };
    }

    default:
      return state;
  }
};

function useUndo<T>(initialPresent: T) {
  const [state, dispatch] = useReducer<Reducer<T>>(undoReducer, {
    ...initialState,
    present: initialPresent,
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undoAction = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' });
    }
  }, [canUndo]);

  const redoAction = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [canRedo]);

  const setState = useCallback((newStateValue: T) => {
    dispatch({ type: 'SET', payload: { value: newStateValue } });
  }, []);

  const resetState = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state: state.present as T,

    past: state.past as T[],
    present: state.present,
    future: state.future as T[],

    canUndo,
    canRedo,
    undoAction,
    redoAction,
    setState,
    resetState,
  };
}
export default useUndo;
